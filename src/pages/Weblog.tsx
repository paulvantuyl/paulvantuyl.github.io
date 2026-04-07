import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'
import { Text } from '../components/Text'
import { Select } from '../components/Select'
import { Combobox } from '../components/Combobox'
import { Input } from '../components/Input'

type PostSummary = {
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

type ManifestPayload = {
    generatedAt: string
    totalPosts: number
    totalPages: number
    postsPerPage: number
    pageFiles: string[]
    allPostsFile?: string
}

type PagePayload = {
    page: number
    totalPages: number
    totalPosts: number
    postsPerPage: number
    posts: PostSummary[]
}

type AllPostsPayload = {
    generatedAt: string
    totalPosts: number
    posts: PostSummary[]
}

const DEFAULT_POSTS_PER_PAGE = 12

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

function normalizeSearch(value: string) {
    return value.trim().toLowerCase()
}

export function Weblog() {
    const [manifest, setManifest] = useState<ManifestPayload | null>(null)
    const [pagePosts, setPagePosts] = useState<PostSummary[]>([])
    const [allPosts, setAllPosts] = useState<PostSummary[] | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedTag, setSelectedTag] = useState('all')
    const [isLoadingManifest, setIsLoadingManifest] = useState(true)
    const [isLoadingPage, setIsLoadingPage] = useState(false)
    const [isLoadingAllPosts, setIsLoadingAllPosts] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const isFilterMode = searchQuery.trim().length > 0 || selectedCategory !== 'all' || selectedTag !== 'all'
    const postsPerPage = manifest?.postsPerPage ?? DEFAULT_POSTS_PER_PAGE

    const ensureAllPostsLoaded = useCallback(async () => {
        if (!manifest?.allPostsFile || allPosts || isLoadingAllPosts) {
            return
        }

        setIsLoadingAllPosts(true)
        setErrorMessage(null)

        try {
            const response = await fetch(`/weblog/${manifest.allPostsFile}`)
            if (!response.ok) {
                throw new Error(`Unable to load ${manifest.allPostsFile}`)
            }

            const payload = (await response.json()) as AllPostsPayload
            setAllPosts(payload.posts)
        } catch {
            setErrorMessage('Unable to load search and filter index right now.')
        } finally {
            setIsLoadingAllPosts(false)
        }
    }, [allPosts, isLoadingAllPosts, manifest])

    useEffect(() => {
        const loadManifest = async () => {
            setIsLoadingManifest(true)
            setErrorMessage(null)

            try {
                const response = await fetch('/weblog/posts-manifest.json')
                if (!response.ok) {
                    throw new Error('Unable to load posts manifest.')
                }

                const payload = (await response.json()) as ManifestPayload
                setManifest(payload)
            } catch {
                setErrorMessage('Unable to load blog index right now.')
            } finally {
                setIsLoadingManifest(false)
            }
        }

        void loadManifest()
    }, [])

    useEffect(() => {
        if (!manifest || isFilterMode) {
            return
        }

        const maxPage = Math.max(1, manifest.totalPages)
        const safePage = Math.min(Math.max(currentPage, 1), maxPage)

        if (safePage !== currentPage) {
            setCurrentPage(safePage)
            return
        }

        const loadPage = async () => {
            setIsLoadingPage(true)
            setErrorMessage(null)

            const fileName = manifest.pageFiles[safePage - 1] ?? `posts-page-${safePage}.json`

            try {
                const response = await fetch(`/weblog/${fileName}`)
                if (!response.ok) {
                    throw new Error(`Unable to load ${fileName}`)
                }

                const payload = (await response.json()) as PagePayload
                setPagePosts(payload.posts)
            } catch {
                setErrorMessage('Unable to load posts for this page.')
            } finally {
                setIsLoadingPage(false)
            }
        }

        void loadPage()
    }, [currentPage, isFilterMode, manifest])

    useEffect(() => {
        void ensureAllPostsLoaded()
    }, [ensureAllPostsLoaded])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategory, selectedTag])

    const availableCategories = useMemo(() => {
        if (!allPosts) {
            return []
        }

        const categorySet = new Set<string>()
        for (const post of allPosts) {
            if (post.category) {
                categorySet.add(post.category)
            }
        }

        return Array.from(categorySet).sort((a, b) => a.localeCompare(b))
    }, [allPosts])

    const availableTags = useMemo(() => {
        if (!allPosts) {
            return []
        }

        const tagSet = new Set<string>()
        for (const post of allPosts) {
            for (const tag of post.tags) {
                tagSet.add(tag)
            }
        }

        return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
    }, [allPosts])

    const filteredPosts = useMemo(() => {
        if (!allPosts) {
            return []
        }

        const normalizedQuery = normalizeSearch(searchQuery)

        return allPosts.filter((post) => {
            const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
            const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)

            if (!matchesCategory || !matchesTag) {
                return false
            }

            if (!normalizedQuery) {
                return true
            }

            const searchableFields = [
                post.title,
                post.excerpt,
                post.category ?? '',
                post.tags.join(' '),
            ]

            return searchableFields.join(' ').toLowerCase().includes(normalizedQuery)
        })
    }, [allPosts, searchQuery, selectedCategory, selectedTag])

    const totalPages = useMemo(() => {
        if (isFilterMode) {
            return Math.max(1, Math.ceil(filteredPosts.length / postsPerPage))
        }

        return manifest?.totalPages ?? 1
    }, [filteredPosts.length, isFilterMode, manifest?.totalPages, postsPerPage])

    useEffect(() => {
        const safePage = Math.min(Math.max(currentPage, 1), totalPages)
        if (safePage !== currentPage) {
            setCurrentPage(safePage)
        }
    }, [currentPage, totalPages])

    const visiblePosts = useMemo(() => {
        if (!isFilterMode) {
            return pagePosts
        }

        const start = (currentPage - 1) * postsPerPage
        const end = start + postsPerPage
        return filteredPosts.slice(start, end)
    }, [currentPage, filteredPosts, isFilterMode, pagePosts, postsPerPage])

    const subtitle = isFilterMode
        ? `Page ${currentPage} of ${totalPages} (filtered)`
        : `Page ${currentPage} of ${totalPages}`

    const hasVisiblePosts = visiblePosts.length > 0

    return (
        <Layout title="Weblog" subtitle={subtitle}>

            <section className="filters">
                <div className="mt-2 mb-6 flex lg:flex-row flex-col items-center gap-3">   
                    <Input
                        label="Search"
                        placeholder="Search"
                        value={searchQuery}
                        labelHidden={true}
                        onChange={(value) => setSearchQuery(String(value ?? ''))}
                    />
                    <Select
                        value={selectedCategory}
                        onChange={(value) => setSelectedCategory(String(value ?? 'all'))}
                        disabled={!allPosts && isLoadingAllPosts}
                        label="Category"
                        labelHidden={true}
                        options={[
                            { value: 'all', label: 'All categories' },
                            ...availableCategories.map((category) => ({ value: category, label: category })),
                        ]}                    
                    />
                    <Combobox
                        value={selectedTag}
                        onChange={(value) => setSelectedTag(String(value ?? 'all'))}
                        disabled={!allPosts && isLoadingAllPosts}
                        label="Tag"
                        labelHidden={true}
                        options={[
                            { value: 'all', label: 'All tags' },
                            ...availableTags.map((tag) => ({ value: tag, label: tag })),
                        ]}
                    />
                    <Button
                        type="button"
                        onClick={() => {
                            setSearchQuery('')
                            setSelectedCategory('all')
                            setSelectedTag('all')
                        }}
                    >
                        Clear filters
                    </Button>

                    {isLoadingAllPosts ? <Text variant="p">Loading search index...</Text> : null}
                </div>
            </section>

            {isLoadingManifest || isLoadingPage ? <Text variant="p">Loading posts...</Text> : null}
            {errorMessage ? <Text variant="p">{errorMessage}</Text> : null}

            {hasVisiblePosts ? (
                <section>
                    <div className="grid grid-cols-3 gap-4">
                        {visiblePosts.map((post) => (
                                <article className="blog-item" key={post.sourceFile}>
                                    <small className="blog-date">{formatDate(post.date)}</small>

                                    <Text variant="h3" className="post-title">
                                        <Link to={`/weblog/${post.slug}`}>{post.title}</Link>
                                    </Text>

                                    <Text variant="p">{post.excerpt}</Text>
                                </article>
                        ))}
                    </div>
                </section>
            ) : null}

            {!isLoadingManifest && !isLoadingPage && !hasVisiblePosts ? (
                <Text variant="p">No posts match your search or filters.</Text>
            ) : null}

            <nav className="pagination mt-4 flex flex-row items-center gap-3" aria-label="Blog page navigation">
                <Button
                    type="button"
                    leadingIcon="arrow-left"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                >
                    Older
                </Button>
                <Button
                    type="button"
                    trailingIcon="arrow-right"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
                >
                    Newer
                </Button>
                <Text variant="p">Page {currentPage} of {totalPages}</Text>
            </nav>
        </Layout>
    )
}
