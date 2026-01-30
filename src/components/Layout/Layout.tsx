import type { ReactNode } from 'react'
import { Navbar } from '../Navbar'

interface LayoutProps {
    children: ReactNode
    documentTitle?: string
}

export function Layout({ children, documentTitle = 'hello_world.md' }: LayoutProps) {

    return (
        <div className="bg-midnight w-dvw h-dvh monitor-dots">
            <Navbar />

            <div className="flex flex-col h-auto w-auto md:h-7/8 md:w-7/8 md:m-4 border-2 border-border-color document">
                <div className="w-full flex justify-center py-2 px-1 border-b-3 bg-black border-border-color">
                    <small>{documentTitle}</small>
                </div>
                <div>

                    {children}
                </div>
                
            </div>
        </div>
    )
}
