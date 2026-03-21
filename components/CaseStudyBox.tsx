interface CaseStudyBoxProps {
  tool: string;
  stat: string;
  description: string;
  blogLink?: string;
  productLink?: string;
  productName?: string;
}

export function CaseStudyBox({ tool, stat, description, blogLink, productLink, productName }: CaseStudyBoxProps) {
  return (
    <div className="border-l-4 border-blue-500 bg-slate-800/50 p-4 my-6 rounded-r-lg">
      <p className="text-sm text-blue-400 font-semibold mb-1">So nutzen wir es bei AI Engineering</p>
      <p className="text-slate-200">
        Wir nutzen <strong>{tool}</strong> mit <strong>{stat}</strong> {description}.
      </p>
      <div className="flex gap-4 mt-2">
        {blogLink && (
          <a href={blogLink} className="text-sm text-blue-400 hover:underline">
            &rarr; Mehr erfahren
          </a>
        )}
        {productLink && productName && (
          <a href={productLink} className="text-sm text-emerald-400 hover:underline">
            &rarr; {productName}
          </a>
        )}
      </div>
    </div>
  );
}
