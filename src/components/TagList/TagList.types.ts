import type { HTMLAttributes } from 'react'

export interface TagListItem {
  value: string
}

export interface TagListProps extends HTMLAttributes<HTMLDivElement> {
  tags: TagListItem[]
}
