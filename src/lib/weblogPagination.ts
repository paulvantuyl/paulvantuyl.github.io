export function parsePageParam(value: string | null) {
  if (!value) {
    return 1
  }

  const parsedPage = Number.parseInt(value, 10)
  if (Number.isNaN(parsedPage) || parsedPage < 1) {
    return 1
  }

  return parsedPage
}

export function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1))
}
