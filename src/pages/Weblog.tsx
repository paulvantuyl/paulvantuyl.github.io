import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'
import { Text } from '../components/Text'
import { Select } from '../components/Select'
import { Combobox } from '../components/Combobox'
import { Input } from '../components/Input'
import { MarkdownContent } from '../components/MarkdownContent'
import { useWeblogSearchParams } from '../hooks/useWeblogSearchParams'
import { fetchAllPosts, fetchManifest, fetchPage } from '../lib/weblogApi'
import { clampPage } from '../lib/weblogPagination'
import { weblogQueryKeys } from '../lib/weblogQueryKeys'

const DEFAULT_POSTS_PER_PAGE = 12

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
    const queryClient = useQueryClient()
    const {
        page: currentPage,
        searchQuery,
        selectedCategory,
        selectedTag,
        setParams,
    } = useWeblogSearchParams()

    const isFilterMode = searchQuery.trim().length > 0 || selectedCategory !== 'all' || selectedTag !== 'all'
    const manifestQuery = useQuery({
        queryKey: weblogQueryKeys.manifest,
        queryFn: fetchManifest,
    })
    const manifest = manifestQuery.data ?? null
    const postsPerPage = manifest?.postsPerPage ?? DEFAULT_POSTS_PER_PAGE

    const pageFileName = manifest?.pageFiles[currentPage - 1] ?? `posts-page-${currentPage}.json`
    const pageQuery = useQuery({
        queryKey: weblogQueryKeys.page(pageFileName, currentPage),
        queryFn: () => fetchPage(pageFileName),
        enabled: Boolean(manifest) && !isFilterMode,
        placeholderData: keepPreviousData,
    })

    const allPostsQuery = useQuery({
        queryKey: weblogQueryKeys.allPosts(manifest?.allPostsFile ?? 'missing'),
        queryFn: () => fetchAllPosts(manifest?.allPostsFile ?? ''),
        enabled: Boolean(manifest?.allPostsFile),
    })
    const allPosts = allPostsQuery.data?.posts ?? null

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

        if (isFilterMode && !allPosts && allPostsQuery.isPending) {
            return
        }

        const safePage = clampPage(currentPage, totalPages)
        if (safePage !== currentPage) {
            setParams({ page: safePage }, true)
        }
    }, [allPosts, allPostsQuery.isPending, currentPage, isFilterMode, manifest, setParams, totalPages])

    // Prefetch neighboring pages so next/previous pagination is snappier.
    useEffect(() => {
        if (!manifest || isFilterMode) {
            return
        }

        const neighborPages = [currentPage - 1, currentPage + 1].filter(
            (page) => page >= 1 && page <= manifest.totalPages
        )

        for (const page of neighborPages) {
            const fileName = manifest.pageFiles[page - 1] ?? `posts-page-${page}.json`
            void queryClient.prefetchQuery({
                queryKey: weblogQueryKeys.page(fileName, page),
                queryFn: () => fetchPage(fileName),
            })
        }
    }, [currentPage, isFilterMode, manifest, queryClient])

    const visiblePosts = useMemo(() => {
        if (!isFilterMode) {
            return pageQuery.data?.posts ?? []
        }

        const start = (currentPage - 1) * postsPerPage
        const end = start + postsPerPage
        return filteredPosts.slice(start, end)
    }, [currentPage, filteredPosts, isFilterMode, pageQuery.data?.posts, postsPerPage])

    const subtitle = isFilterMode
        ? `${currentPage} of ${totalPages} // Filtered notes.`
        : `${currentPage} of ${totalPages} // Notes I decided to post online.`

    const hasVisiblePosts = visiblePosts.length > 0
    const isLoadingManifest = manifestQuery.isPending
    const isLoadingPage = !isFilterMode && pageQuery.isFetching
    const isLoadingAllPosts = allPostsQuery.isPending
    const errorMessage =
        (manifestQuery.error as Error | null)?.message ??
        (allPostsQuery.error as Error | null)?.message ??
        (pageQuery.error as Error | null)?.message ??
        null

    const goToPreviousPage = () => {
        const nextPage = Math.max(1, currentPage - 1)
        if (nextPage !== currentPage) {
            setParams({ page: nextPage })
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }
    }

    const goToNextPage = () => {
        const nextPage = Math.min(totalPages, currentPage + 1)
        if (nextPage !== currentPage) {
            setParams({ page: nextPage })
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
                        onChange={(value) => {
                            setParams({ searchQuery: String(value ?? ''), page: 1 }, true)
                        }}
                    />
                    <div className="grow">
                        <Select
                            value={selectedCategory}
                            onChange={(value) => {
                                setParams({ selectedCategory: String(value ?? 'all'), page: 1 }, true)
                            }}
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
                        onChange={(value) => {
                            setParams({ selectedTag: String(value ?? 'all'), page: 1 }, true)
                        }}
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
                            setParams(
                                {
                                    searchQuery: '',
                                    selectedCategory: 'all',
                                    selectedTag: 'all',
                                    page: 1,
                                },
                                true
                            )
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
