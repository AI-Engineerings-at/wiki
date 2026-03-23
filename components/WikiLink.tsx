import Link from 'next/link'
import type { ComponentProps } from 'react'

/**
 * Wiki-specific Link wrapper that disables RSC prefetching.
 * Required because the wiki uses Next.js static export (output: 'export')
 * which doesn't generate RSC payload files. Without this, every Link
 * triggers "Failed to fetch RSC payload" console errors.
 */
export function WikiLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />
}
