import type { HTMLAttributes } from 'react'
import type { TextVariant } from '../Text/Text.types'

export interface TagListItem {
  value: string
}

export interface TagListProps extends HTMLAttributes<HTMLDivElement> {
  tags: TagListItem[]
  variant?: TextVariant
}
