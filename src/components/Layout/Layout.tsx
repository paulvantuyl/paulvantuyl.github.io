import type { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import { Text } from '../Text';
import './layout.css';

interface LayoutProps {
    title?: ReactNode
    subtitle?: ReactNode
    variant?: 'default' | 'sidebar'
    sidebarContent?: ReactNode
    children: ReactNode
}

export function Layout({
    title,
    subtitle,
    variant = 'default',
    sidebarContent,
    children,
}: LayoutProps) {

    const isSidebarVariant = variant === 'sidebar'

    return (
        <div className="w-dvw h-dvh">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4">
                <div className="py-6">
                    {title ? <Text variant="h1" className="page-title">{title}</Text> : null}
                    {subtitle ? <Text variant="p" className="lead">{subtitle}</Text> : null}

                    {isSidebarVariant ? (
                        <div className="content grid grid-cols-1 gap-6 lg:grid-cols-4">
                            <div className="lg:col-span-3">
                                {children}
                            </div>
                            <aside className="lg:col-span-1">
                                {sidebarContent}
                            </aside>
                        </div>
                    ) : (
                        <div className="content">
                            {children}
                        </div>
                    )}
                </div>   
            </div>
        </div>
    )
}
