export type PostSummary = {
  sourceFile: string
  slug: string
  title: string
  date: string | null
  published: boolean
  category: string | null
  tags: string[]
  active: string | null
  image_thumb: string | null
  image: string | null
  link_destination: string | null
  excerpt: string
}

export type ManifestPayload = {
  generatedAt: string
  totalPosts: number
  totalPages: number
  postsPerPage: number
  pageFiles: string[]
  allPostsFile?: string
}

export type PagePayload = {
  page: number
  totalPages: number
  totalPosts: number
  postsPerPage: number
  posts: PostSummary[]
}

export type AllPostsPayload = {
  generatedAt: string
  totalPosts: number
  posts: PostSummary[]
}

async function fetchJson<T>(url: string, errorMessage: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return (await response.json()) as T
}

export function fetchManifest() {
  return fetchJson<ManifestPayload>('/weblog/posts-manifest.json', 'Unable to load blog index right now.')
}

export function fetchPage(fileName: string) {
  return fetchJson<PagePayload>(`/weblog/${fileName}`, 'Unable to load posts for this page.')
}

export function fetchAllPosts(allPostsFile: string) {
  return fetchJson<AllPostsPayload>(
    `/weblog/${allPostsFile}`,
    'Unable to load search and filter index right now.'
  )
}
