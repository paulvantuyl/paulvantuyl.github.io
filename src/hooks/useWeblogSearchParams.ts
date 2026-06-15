import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { parsePageParam } from '../lib/weblogPagination'

function normalizeValue(value: string | null, fallback = 'all') {
  const normalized = value?.trim()
  return normalized ? normalized : fallback
}

type SearchParamUpdates = Partial<{
  page: number
  searchQuery: string
  selectedCategory: string
  selectedTag: string
}>

export function buildNextWeblogSearch(currentSearch: string, nextValues: SearchParamUpdates) {
  const params = new URLSearchParams(currentSearch)

  if (nextValues.page !== undefined) {
    const safePage = Math.max(1, nextValues.page)
    if (safePage <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(safePage))
    }
  }

  if (nextValues.searchQuery !== undefined) {
    const normalized = nextValues.searchQuery.trim()
    if (normalized) {
      params.set('q', normalized)
    } else {
      params.delete('q')
    }
  }

  if (nextValues.selectedCategory !== undefined) {
    const normalized = normalizeValue(nextValues.selectedCategory)
    if (normalized === 'all') {
      params.delete('category')
    } else {
      params.set('category', normalized)
    }
  }

  if (nextValues.selectedTag !== undefined) {
    const normalized = normalizeValue(nextValues.selectedTag)
    if (normalized === 'all') {
      params.delete('tag')
    } else {
      params.set('tag', normalized)
    }
  }

  return params.toString()
}

export function useWeblogSearchParams() {
  const location = useLocation()
  const navigate = useNavigate()

  const values = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return {
      page: parsePageParam(params.get('page')),
      searchQuery: params.get('q') ?? '',
      selectedCategory: normalizeValue(params.get('category')),
      selectedTag: normalizeValue(params.get('tag')),
    }
  }, [location.search])

  const setParams = useCallback(
    (
      nextValues: SearchParamUpdates,
      replace = false
    ) => {
      const currentSearch = location.search.startsWith('?')
        ? location.search.slice(1)
        : location.search
      const nextSearch = buildNextWeblogSearch(currentSearch, nextValues)

      if (nextSearch !== currentSearch) {
        navigate(
          {
            pathname: location.pathname,
            search: nextSearch ? `?${nextSearch}` : '',
          },
          { replace }
        )
      }
    },
    [location.pathname, location.search, navigate]
  )

  return {
    ...values,
    setParams,
  }
}
