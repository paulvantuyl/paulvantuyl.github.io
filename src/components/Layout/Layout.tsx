import type { ReactNode } from 'react'
import { Navbar } from '../Navbar'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {

    return (
        <div className="w-dvw h-dvh">
            <Navbar />

            <div className="flex flex-col h-auto w-auto">
                <div>
                    {children}
                </div>
                
            </div>
        </div>
    )
}
