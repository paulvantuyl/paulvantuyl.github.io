export const weblogQueryKeys = {
  manifest: ['weblog', 'manifest'] as const,
  allPosts: (allPostsFile: string) => ['weblog', 'all-posts', allPostsFile] as const,
  page: (fileName: string, page: number) => ['weblog', 'page', fileName, page] as const,
}
