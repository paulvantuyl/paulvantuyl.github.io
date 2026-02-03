import type { ReactNode } from 'react'
import { Navbar } from '../Navbar'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {

    return (
        <div className="w-dvw h-dvh">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4">
                <div className="py-6">
                    {children}
                </div>   
            </div>
        </div>
    )
}
