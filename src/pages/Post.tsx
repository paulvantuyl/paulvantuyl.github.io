import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Text } from '../components/Text'
import { Button } from '../components/Button'
import { MarkdownContent } from '../components/MarkdownContent'

type PostData = {
  sourceFile: string
  slug: string
  title: string
  date: string | null
  category: string | null
  tags: string[]
  image: string | null
  image_thumb: string | null
  link_destination: string | null
  embed: string | null
  content: string
}

const markdownModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function createSlug(fileName: string) {
  return fileName
    .replace(/\.md$/i, '')
    .replace(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}-/, '')
}

function stripQuotes(value: string) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseFrontmatter(fileContent: string) {
  if (!fileContent.startsWith('---')) {
    return { frontmatter: {}, body: fileContent.trim() }
  }

  const endIndex = fileContent.indexOf('\n---', 4)
  if (endIndex === -1) {
    return { frontmatter: {}, body: fileContent.trim() }
  }

  const rawFrontmatter = fileContent.slice(3, endIndex).trim()
  const body = fileContent.slice(endIndex + 4).trim()
  const frontmatter: Record<string, string | string[] | boolean> = {}
  const lines = rawFrontmatter.split(/\r?\n/)
  let currentListKey: string | null = null

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const trimmed = line.trim()
    if (!trimmed) {
      continue
    }

    const listItemMatch = /^-\s+(.+)$/.exec(trimmed)
    if (listItemMatch && currentListKey) {
      const list = frontmatter[currentListKey]
      if (Array.isArray(list)) {
        list.push(stripQuotes(listItemMatch[1]))
      }
      continue
    }

    const keyValueMatch = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(trimmed)
    if (!keyValueMatch) {
      continue
    }

    const key = keyValueMatch[1]
    const rawValue = keyValueMatch[2]

    if (rawValue === '|' || rawValue === '>') {
      currentListKey = null
      const blockLines: string[] = []
      let blockIndex = index + 1

      while (blockIndex < lines.length) {
        const blockLine = lines[blockIndex]

        if (blockLine.trim() === '') {
          blockLines.push('')
          blockIndex += 1
          continue
        }

        if (!/^\s+/.test(blockLine)) {
          break
        }

        blockLines.push(blockLine.replace(/^\s+/, ''))
        blockIndex += 1
      }

      frontmatter[key] = rawValue === '>'
        ? blockLines.join(' ').trim()
        : blockLines.join('\n').trim()
      index = blockIndex - 1
      continue
    }

    if (rawValue === '') {
      currentListKey = key
      frontmatter[key] = []
      continue
    }

    currentListKey = null
    const normalizedValue = stripQuotes(rawValue)
    if (normalizedValue === 'true') {
      frontmatter[key] = true
    } else if (normalizedValue === 'false') {
      frontmatter[key] = false
    } else {
      frontmatter[key] = normalizedValue
    }
  }

  return { frontmatter, body }
}

function parseDateValue(value: string | null) {
  if (!value) {
    return null
  }

  const isoLike = value.includes(' ') ? value.replace(' ', 'T') : value
  const parsedDate = new Date(isoLike)

  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return parsedDate
}

function formatDate(value: string | null) {
  const parsedDate = parseDateValue(value)
  if (!parsedDate) {
    return value ?? 'Unknown date'
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsedDate)
}

function buildPostsMap() {
  const posts = new Map<string, PostData>()

  for (const [modulePath, fileContent] of Object.entries(markdownModules)) {
    const fileName = modulePath.split('/').pop() ?? ''
    const { frontmatter, body } = parseFrontmatter(fileContent)
    const tags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags
      : typeof frontmatter.tags === 'string'
        ? [frontmatter.tags]
        : []

    const post: PostData = {
      sourceFile: fileName,
      slug: createSlug(fileName),
      title: typeof frontmatter.title === 'string' ? frontmatter.title : createSlug(fileName),
      date: typeof frontmatter.date === 'string' ? frontmatter.date : null,
      category: typeof frontmatter.category === 'string' ? frontmatter.category : null,
      tags,
      image: typeof frontmatter.image === 'string' ? frontmatter.image : null,
      image_thumb: typeof frontmatter.image_thumb === 'string' ? frontmatter.image_thumb : null,
      link_destination: typeof frontmatter.link_destination === 'string' ? frontmatter.link_destination : null,
      embed: typeof frontmatter.embed === 'string' ? frontmatter.embed : null,
      content: body,
    }

    posts.set(post.slug, post)
  }

  return posts
}

const postsBySlug = buildPostsMap()

export function Post() {
  const navigate = useNavigate()
  const { slug } = useParams()
  
  const post = slug ? postsBySlug.get(slug) : undefined

  const handleBack = () => {
    const historyState = window.history.state as { idx?: number } | null
    const canNavigateBack = typeof historyState?.idx === 'number'
      ? historyState.idx > 0
      : window.history.length > 1

    if (canNavigateBack) {
      navigate(-1)
    } else {
      navigate(`/weblog${window.location.search}`)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!post) {
    return (
      <Layout title="Post Not Found" subtitle="The requested post could not be loaded.">
        <Text variant="p">We couldn't find the blog post you requested.</Text>
        <Text variant="p"><Link to="/weblog">Back to Weblog</Link></Text>
      </Layout>
    )
  }

  const sidebarContent = (
    <>
    <Text variant="h5" className="post-tags">
      {post.tags.length > 0 ? (
        post.tags.map((tag) => (
        <span key={tag}>{tag}&amp;<br /></span>
        ))
      ) : (
        <span>No tags</span>
      )}
    </Text>
    </>
  )

  return (
    <Layout
      title={post.title}
      subtitle={formatDate(post.date) + (post.category ? ` // ${post.category}` : '')}
      variant="sidebar"
      sidebarContent={sidebarContent}
    >

      {post.image ? <img className="post-img" src={post.image} alt={post.title} /> : null}

      {post.link_destination ? (
        <Text variant="p">
          Original link: <a href={post.link_destination} target="_blank" rel="noreferrer">{post.link_destination}</a>
        </Text>
      ) : null}

      {post.embed ? (
        <div
          className="responsive-embed widescreen mb-6"
          dangerouslySetInnerHTML={{ __html: post.embed }}
        />
      ) : null}

      <MarkdownContent content={post.content} />
      
      <Button type="button" onClick={handleBack} leadingIcon="arrow-left">Back to Weblog</Button>
    </Layout>
  )
}
