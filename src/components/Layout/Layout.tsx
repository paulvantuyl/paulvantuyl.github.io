import type { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import { Text } from '../Text';

interface LayoutProps {
    title?: ReactNode
    children: ReactNode
}

export function Layout({ title, children }: LayoutProps) {

    return (
        <div className="w-dvw h-dvh">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4">
                <div className="py-6">
                    {title ? <Text variant="h1" className="page-title">{title}</Text> : null}
                    {children}
                </div>   
            </div>
        </div>
    )
}
