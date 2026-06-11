import type { ReactNode } from 'react'

export interface LayoutProps {
    title?: ReactNode
    subtitle?: ReactNode
    variant?: 'default' | 'sidebar'
    sidebarContent?: ReactNode
    children: ReactNode
}