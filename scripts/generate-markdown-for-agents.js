#!/usr/bin/env node

/**
 * generate-markdown-for-agents.js
 *
 * Converts all MDX files in content/ to clean Markdown for AI agents.
 * Output: public/md/[original-path].md + public/md/index.json
 *
 * Why: AI agents (ClaudeBot, GPTBot, etc.) consume ~80% fewer tokens
 * reading clean Markdown vs rendered HTML. This makes our wiki the
 * best-structured AI source in the DACH AI-Engineering space.
 *
 * Usage:
 *   node scripts/generate-markdown-for-agents.js
 *
 * Idempotent: safe to run multiple times. Cleans output dir first.
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'md');
const BASE_URL = 'https://wiki.ai-engineering.at';
const INDEX_FILE = path.join(OUTPUT_DIR, 'index.json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Recursively find all .mdx files in a directory
 */
function findMdxFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip __pycache__ and hidden dirs
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
      findMdxFiles(fullPath, fileList);
    } else if (entry.name.endsWith('.mdx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

/**
 * Parse YAML frontmatter from MDX content.
 * Returns { frontmatter: {}, body: string }
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const rawYaml = match[1];
  const body = match[2];

  // Simple YAML parser for flat key-value frontmatter
  const frontmatter = {};
  for (const line of rawYaml.split('\n')) {
    const kvMatch = line.match(/^(\w[\w-]*)\s*:\s*(.+)$/);
    if (kvMatch) {
      let key = kvMatch[1].trim();
      let value = kvMatch[2].trim();
      // Strip surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Parse arrays like [foo, bar, baz]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => {
          v = v.trim();
          if ((v.startsWith('"') && v.endsWith('"')) ||
              (v.startsWith("'") && v.endsWith("'"))) {
            v = v.slice(1, -1);
          }
          return v;
        });
      }
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

/**
 * Reconstruct YAML frontmatter as a string
 */
function serializeFrontmatter(fm) {
  if (!fm || Object.keys(fm).length === 0) return '';

  const lines = ['---'];
  for (const [key, value] of Object.entries(fm)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.join(', ')}]`);
    } else {
      lines.push(`${key}: "${value}"`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

/**
 * Clean MDX body to pure Markdown:
 * 1. Remove JSX component tags (<Callout>, <Component />, etc.)
 * 2. Keep content inside JSX block components
 * 3. Remove JSX import statements (but not Python imports in code blocks)
 * 4. Fix relative links to absolute URLs
 */
function cleanMdxBody(body, relativePath) {
  const lines = body.split('\n');
  const output = [];
  let insideCodeBlock = false;
  let insideJsxBlock = false;
  let jsxBlockContent = [];
  let jsxBlockTag = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track code blocks — never modify content inside code fences
    if (line.trimStart().startsWith('```')) {
      if (!insideCodeBlock) {
        insideCodeBlock = true;
        output.push(line);
        continue;
      } else {
        insideCodeBlock = false;
        output.push(line);
        continue;
      }
    }

    if (insideCodeBlock) {
      output.push(line);
      continue;
    }

    // Handle JSX block components (e.g., <Callout type="info">...</Callout>)
    // Opening tag: <ComponentName ...>
    const openMatch = line.match(/^\s*<([A-Z]\w+)(\s[^>]*)?>$/);
    if (openMatch && !insideJsxBlock) {
      jsxBlockTag = openMatch[1];
      insideJsxBlock = true;
      jsxBlockContent = [];
      continue;
    }

    // Closing tag: </ComponentName>
    if (insideJsxBlock) {
      const closeMatch = line.match(new RegExp(`^\\s*</${jsxBlockTag}>\\s*$`));
      if (closeMatch) {
        // Emit the inner content (the actual text inside the JSX component)
        for (const innerLine of jsxBlockContent) {
          output.push(innerLine);
        }
        insideJsxBlock = false;
        jsxBlockTag = null;
        jsxBlockContent = [];
        continue;
      }
      jsxBlockContent.push(line);
      continue;
    }

    // Remove self-closing JSX tags: <Component foo="bar" />
    if (line.match(/^\s*<[A-Z]\w+(\s[^>]*)?\s*\/>\s*$/)) {
      continue;
    }

    // Remove single-line JSX tags: <Component>...</Component> on same line
    const inlineJsx = line.match(/^\s*<([A-Z]\w+)(\s[^>]*)?>(.+?)<\/\1>\s*$/);
    if (inlineJsx) {
      // Keep the inner content
      output.push(inlineJsx[3].trim());
      continue;
    }

    // Remove JSX/ESM import lines (only at top level, not in code blocks)
    // These look like: import Foo from './Foo'
    // But NOT Python imports inside code examples (those are in code blocks)
    if (line.match(/^\s*import\s+\w+\s+from\s+['"]/) ||
        line.match(/^\s*import\s+\{[^}]+\}\s+from\s+['"]/) ||
        line.match(/^\s*export\s+(default\s+)?/)) {
      continue;
    }

    output.push(line);
  }

  let result = output.join('\n');

  // Fix relative links: convert to absolute wiki URLs
  // Pattern: [text](../foo) or [text](./foo) or [text](/foo)
  result = result.replace(/\]\(\.\.\//g, `](${BASE_URL}/`);
  result = result.replace(/\]\(\.\//g, `](${BASE_URL}/`);

  // Links starting with / should also be absolute
  result = result.replace(/\]\(\//g, `](${BASE_URL}/`);

  // Fix relative image paths similarly
  result = result.replace(/\]\((\.\.\/[^)]+)\)/g, (match, p1) => {
    return `](${BASE_URL}/${p1.replace(/\.\.\//g, '')})`;
  });

  // Clean up excessive blank lines (more than 2 consecutive)
  result = result.replace(/\n{4,}/g, '\n\n\n');

  // Trim trailing whitespace
  result = result.trim() + '\n';

  return result;
}

/**
 * Derive the web URL path from the file path
 * content/de/compliance/eu-ai-act-guide.mdx -> /de/compliance/eu-ai-act-guide
 */
function getWebPath(filePath) {
  const rel = path.relative(CONTENT_DIR, filePath);
  // Remove .mdx extension, normalize separators
  return '/' + rel.replace(/\\/g, '/').replace(/\.mdx$/, '');
}

/**
 * Derive the output path for the clean markdown file
 * content/de/compliance/eu-ai-act-guide.mdx -> public/md/de/compliance/eu-ai-act-guide.md
 */
function getOutputPath(filePath) {
  const rel = path.relative(CONTENT_DIR, filePath);
  return path.join(OUTPUT_DIR, rel.replace(/\.mdx$/, '.md'));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('=== Markdown for Agents Generator ===\n');

  // 1. Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
    console.log(`Cleaned: ${OUTPUT_DIR}`);
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // 2. Find all MDX files
  const mdxFiles = findMdxFiles(CONTENT_DIR);
  console.log(`Found: ${mdxFiles.length} MDX files\n`);

  if (mdxFiles.length === 0) {
    console.error('ERROR: No MDX files found in', CONTENT_DIR);
    process.exit(1);
  }

  // 3. Process each file
  const index = [];
  let successCount = 0;
  let errorCount = 0;

  for (const filePath of mdxFiles) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter, body } = parseFrontmatter(raw);

      const relativePath = path.relative(CONTENT_DIR, filePath);
      const cleanBody = cleanMdxBody(body, relativePath);

      // Add source URL to frontmatter
      const webPath = getWebPath(filePath);
      frontmatter.source = `${BASE_URL}${webPath}`;

      // Build output
      const header = serializeFrontmatter(frontmatter);
      const output = header ? `${header}\n\n${cleanBody}` : cleanBody;

      // Write file
      const outputPath = getOutputPath(filePath);
      const outputDir = path.dirname(outputPath);
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(outputPath, output, 'utf-8');

      // Add to index
      index.push({
        title: frontmatter.title || path.basename(filePath, '.mdx'),
        path: `/md/${relativePath.replace(/\\/g, '/').replace(/\.mdx$/, '.md')}`,
        webUrl: `${BASE_URL}${webPath}`,
        summary: frontmatter.summary || frontmatter.description || '',
        date: frontmatter.date || '',
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        lang: relativePath.startsWith('de') ? 'de' : relativePath.startsWith('en') ? 'en' : '',
      });

      successCount++;
    } catch (err) {
      console.error(`ERROR processing ${filePath}: ${err.message}`);
      errorCount++;
    }
  }

  // 4. Sort index by date (newest first), then title
  index.sort((a, b) => {
    if (a.date && b.date) {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
    }
    return a.title.localeCompare(b.title);
  });

  // 5. Write index.json
  const indexOutput = {
    generated: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalArticles: index.length,
    description: 'Clean Markdown versions of all AI Engineering Wiki articles, optimized for AI agent consumption. ~80% fewer tokens than HTML.',
    articles: index,
  };
  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexOutput, null, 2), 'utf-8');

  // 6. Report
  console.log(`\nProcessed: ${successCount} files`);
  if (errorCount > 0) {
    console.log(`Errors:    ${errorCount} files`);
  }
  console.log(`Output:    ${OUTPUT_DIR}`);
  console.log(`Index:     ${INDEX_FILE}`);
  console.log(`\nDone.`);
}

main();
