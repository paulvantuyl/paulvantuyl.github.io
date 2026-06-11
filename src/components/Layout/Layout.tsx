import type { LayoutProps } from './Layout.types';
import { Navbar } from '../Navbar';
import { Text } from '../Text';
import './Layout.css';

export function Layout({
    title,
    subtitle,
    variant = 'default',
    sidebarContent,
    children,
}: LayoutProps) {

    const isSidebarVariant = variant === 'sidebar'

    return (
        <div className="w-full">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-6">
                {title ? <Text variant="h1" className="page-title">{title}</Text> : null}
                {subtitle ? <Text variant="p" className="lead">{subtitle}</Text> : null}

                {isSidebarVariant ? (
                    <div className="flex flex-row gap-6 content">
                        <div className="basis-2/3">
                            {children}
                        </div>
                        <aside className="basis-1/3">
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
    )
}
