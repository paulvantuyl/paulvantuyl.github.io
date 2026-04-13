import { useEffect, useMemo, useRef } from 'react'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'

type MarkdownContentProps = {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const html = useMemo(() => {
    return micromark(content, {
      allowDangerousHtml: true,
      extensions: [gfm()],
      htmlExtensions: [gfmHtml()],
    })
  }, [content])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // React ignores scripts inserted via innerHTML, so re-create them to execute
    // legacy embed snippets from migrated markdown content.
    const scripts = Array.from(containerRef.current.querySelectorAll('script'))

    for (const script of scripts) {
      const replacement = document.createElement('script')
      for (const { name, value } of Array.from(script.attributes)) {
        replacement.setAttribute(name, value)
      }
      replacement.text = script.text
      script.replaceWith(replacement)
    }
  }, [html])

  return <div ref={containerRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
