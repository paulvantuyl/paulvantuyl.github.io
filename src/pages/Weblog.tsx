import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'
import { Text } from '../components/Text'
import { Select } from '../components/Select'
import { Combobox } from '../components/Combobox'
import { Input } from '../components/Input'
import { MarkdownContent } from '../components/MarkdownContent'

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

function parsePageParam(value: string | null) {
    if (!value) {
        return 1
    }

    const parsedPage = Number.parseInt(value, 10)
    if (Number.isNaN(parsedPage) || parsedPage < 1) {
        return 1
    }

    return parsedPage
}

function parseDateValue(value: string | null) {
    if (!value) {
        return null
    }

    const normalizedValue = value.trim()
    const localDateMatch = normalizedValue.match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?)?$/
    )

    if (localDateMatch) {
        const [, yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue] = localDateMatch
        const year = Number(yearValue)
        const month = Number(monthValue)
        const day = Number(dayValue)
        const hour = Number(hourValue ?? '0')
        const minute = Number(minuteValue ?? '0')
        const second = Number(secondValue ?? '0')

        const parsedDate = new Date(year, month - 1, day, hour, minute, second)
        const isValidLocalDate =
            parsedDate.getFullYear() === year &&
            parsedDate.getMonth() === month - 1 &&
            parsedDate.getDate() === day &&
            parsedDate.getHours() === hour &&
            parsedDate.getMinutes() === minute &&
            parsedDate.getSeconds() === second

        if (isValidLocalDate) {
            return parsedDate
        }
    }

    const isoLike = normalizedValue.includes(' ') ? normalizedValue.replace(' ', 'T') : normalizedValue
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
    const location = useLocation()
    const navigate = useNavigate()
    const [manifest, setManifest] = useState<ManifestPayload | null>(null)
    const [pagePosts, setPagePosts] = useState<PostSummary[]>([])
    const [allPosts, setAllPosts] = useState<PostSummary[] | null>(null)
    const [currentPage, setCurrentPage] = useState(() =>
        parsePageParam(new URLSearchParams(location.search).get('page'))
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedTag, setSelectedTag] = useState('all')
    const [isLoadingManifest, setIsLoadingManifest] = useState(true)
    const [isLoadingPage, setIsLoadingPage] = useState(false)
    const [isLoadingAllPosts, setIsLoadingAllPosts] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const previousFilterStateRef = useRef<string | null>(null)

    const isFilterMode = searchQuery.trim().length > 0 || selectedCategory !== 'all' || selectedTag !== 'all'
    const postsPerPage = manifest?.postsPerPage ?? DEFAULT_POSTS_PER_PAGE

    // Keep local page state in sync with the page query param.
    useEffect(() => {
        const pageFromUrl = parsePageParam(new URLSearchParams(location.search).get('page'))
        if (pageFromUrl !== currentPage) {
            setCurrentPage(pageFromUrl)
        }
    }, [currentPage, location.search])

    const updatePage = useCallback((nextPage: number, replace = false) => {
        const safePage = Math.max(1, nextPage)
        setCurrentPage(safePage)

        const nextParams = new URLSearchParams(location.search)
        if (safePage <= 1) {
            nextParams.delete('page')
        } else {
            nextParams.set('page', String(safePage))
        }

        const nextSearch = nextParams.toString()
        const currentSearch = location.search.startsWith('?')
            ? location.search.slice(1)
            : location.search

        if (nextSearch !== currentSearch) {
            navigate(
                {
                    pathname: location.pathname,
                    search: nextSearch ? `?${nextSearch}` : '',
                },
                { replace }
            )
        }
    }, [location.pathname, location.search, navigate])

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

    // Load pagination metadata once so page totals and file names are available.
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

    // Load only the currently selected page when browsing without filters.
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

    // Preload the full post index used for search/category/tag filtering.
    useEffect(() => {
        void ensureAllPostsLoaded()
    }, [ensureAllPostsLoaded])

    // Reset to page 1 when filters change, but never on initial mount.
    useEffect(() => {
        const filterState = `${searchQuery}::${selectedCategory}::${selectedTag}`

        if (previousFilterStateRef.current === null) {
            previousFilterStateRef.current = filterState
            return
        }

        if (previousFilterStateRef.current !== filterState) {
            previousFilterStateRef.current = filterState
            updatePage(1, true)
        }
    }, [searchQuery, selectedCategory, selectedTag, updatePage])

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
    
    // Keep currentPage inside valid bounds after pagination totals are known.
    useEffect(() => {
        if (!isFilterMode && !manifest) {
            return
        }

        if (isFilterMode && !allPosts && isLoadingAllPosts) {
            return
        }

        const safePage = Math.min(Math.max(currentPage, 1), totalPages)
        if (safePage !== currentPage) {
            updatePage(safePage, true)
        }
    }, [allPosts, currentPage, isFilterMode, isLoadingAllPosts, manifest, totalPages, updatePage])

    const visiblePosts = useMemo(() => {
        if (!isFilterMode) {
            return pagePosts
        }

        const start = (currentPage - 1) * postsPerPage
        const end = start + postsPerPage
        return filteredPosts.slice(start, end)
    }, [currentPage, filteredPosts, isFilterMode, pagePosts, postsPerPage])

    const subtitle = isFilterMode
        ? `${currentPage} of ${totalPages} // Filtered notes.`
        : `${currentPage} of ${totalPages} // Notes I decided to post online.`

    const hasVisiblePosts = visiblePosts.length > 0

    const goToPreviousPage = () => {
        const nextPage = Math.max(1, currentPage - 1)
        if (nextPage !== currentPage) {
            updatePage(nextPage)
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }
    }

    const goToNextPage = () => {
        const nextPage = Math.min(totalPages, currentPage + 1)
        if (nextPage !== currentPage) {
            updatePage(nextPage)
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }
    }

    return (
        <Layout title="Weblog" subtitle={subtitle}>

            <section className="filters">
                <div className="mt-2 mb-6 grid md:grid-cols-2 lg:grid-cols-4 items-start md:gap-3 lg:gap-6 justify-stretch">   
                    <Input
                        label="Search"
                        placeholder="Search"
                        value={searchQuery}
                        labelHidden={true}
                        stretch={true}
                        onChange={(value) => setSearchQuery(String(value ?? ''))}
                    />
                    <div className="grow">
                        <Select
                            value={selectedCategory}
                            onChange={(value) => setSelectedCategory(String(value ?? 'all'))}
                            disabled={!allPosts && isLoadingAllPosts}
                            label="Category"
                            labelHidden={true}
                            stretch={true}
                            options={[
                                { value: 'all', label: 'All categories' },
                                ...availableCategories.map((category) => ({ value: category, label: category })),
                            ]}                    
                        />
                    </div>
                    <Combobox
                        value={selectedTag}
                        onChange={(value) => setSelectedTag(String(value ?? 'all'))}
                        disabled={!allPosts && isLoadingAllPosts}
                        label="Tag"
                        labelHidden={true}
                        stretch={true}
                        options={[
                            { value: 'all', label: 'All tags' },
                            ...availableTags.map((tag) => ({ value: tag, label: tag })),
                        ]}
                    />
                    <div className="none">
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
                    </div>

                    {isLoadingAllPosts ? <Text variant="p">Loading search index...</Text> : null}
                </div>
            </section>

            {isLoadingManifest || isLoadingPage ? <Text variant="p">Loading posts...</Text> : null}
            {errorMessage ? <Text variant="p">{errorMessage}</Text> : null}

            {hasVisiblePosts ? (
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-6">
                        {visiblePosts.map((post) => (
                            <article className="blog-item" key={post.sourceFile}>
                                <small className="blog-date">{formatDate(post.date)}</small>

                                <Text variant="h3" className="post-title">
                                    <Link to={`/weblog/${post.slug}${location.search}`}>{post.title}</Link>
                                </Text>

                                {post.image_thumb ? (
                                    <img src={post.image_thumb} alt={post.title} />
                                ) : (
                                    <MarkdownContent content={post.excerpt} />
                                )}
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
                    onClick={goToPreviousPage}
                >
                    Newer
                </Button>
                <Button
                    type="button"
                    trailingIcon="arrow-right"
                    disabled={currentPage >= totalPages}
                    onClick={goToNextPage}
                >
                    Older
                </Button>
            </nav>
        </Layout>
    )
}
