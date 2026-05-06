import { describe, expect, it } from 'vitest'
import { buildNextWeblogSearch } from '../hooks/useWeblogSearchParams'
import { clampPage, parsePageParam } from './weblogPagination'

describe('weblog pagination URL behavior', () => {
  it('preserves deep-linked page values from URL params', () => {
    expect(parsePageParam('3')).toBe(3)
  })

  it('normalizes invalid page values to page 1', () => {
    expect(parsePageParam('0')).toBe(1)
    expect(parsePageParam('-1')).toBe(1)
    expect(parsePageParam('abc')).toBe(1)
    expect(parsePageParam(null)).toBe(1)
  })

  it('clamps out-of-range pages to available totals', () => {
    expect(clampPage(5, 3)).toBe(3)
    expect(clampPage(0, 3)).toBe(1)
  })

  it('resets to page 1 when filters change with page set to 1', () => {
    const nextSearch = buildNextWeblogSearch('page=4&q=react', {
      selectedCategory: 'engineering',
      page: 1,
    })
    expect(nextSearch).toBe('q=react&category=engineering')
  })
})
