import type { LayoutProps } from './Layout.types';
import { Navbar } from '../Navbar';
import { Text } from '../Text';
import { Footer } from '../Footer';
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
                <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
                    <div className="basis-auto md:basis-2/3">
                        {title ? <Text variant="h1" className="page-title">{title}</Text> : null}
                    </div>
                    <div className="basis-auto md:basis-1/3">
                        {subtitle ? <Text variant="p" className="lead">{subtitle}</Text> : null}
                    </div>
                </div>

                {isSidebarVariant ? (
                    <div className="flex flex-row flex-wrap md:flex-nowrap gap-6 content">
                        <div className="basis-auto md:basis-2/3 order-2 md:order-1">
                            {children}
                        </div>
                        <aside className="basis-auto md:basis-1/3 order-1 md:order-2">
                            {sidebarContent}
                        </aside>
                    </div>
                ) : (
                    <div className="content">
                        {children}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
