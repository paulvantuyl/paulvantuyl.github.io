import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import { ImageModal } from './ImageModal'

type MarkdownContentProps = {
  content: string
  className?: string
}

type ModalState = {
  src: string
  alt: string
} | null

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [modal, setModal] = useState<ModalState>(null)

  const closeModal = useCallback(() => {
    setModal(null)
  }, [])

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

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest<HTMLAnchorElement>('a[data-image-modal]')
      if (!anchor || !container.contains(anchor)) {
        return
      }

      event.preventDefault()
      const img = anchor.querySelector('img')

      setModal({
        src: anchor.getAttribute('href') ?? '',
        alt: img?.getAttribute('alt') ?? '',
      })
    }

    container.addEventListener('click', handleClick)

    return () => {
      container.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ImageModal
        src={modal?.src ?? ''}
        alt={modal?.alt ?? ''}
        open={modal !== null}
        onClose={closeModal}
      />
    </>
  )
}
