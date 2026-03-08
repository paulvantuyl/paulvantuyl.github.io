import type { HTMLAttributes, ReactNode } from 'react'

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'ul' | 'ol'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  children: ReactNode
}

