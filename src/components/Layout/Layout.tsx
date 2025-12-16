import type { ReactNode } from 'react'
import { Navbar } from '../Navbar'
import { ScrollArea } from 'radix-ui'

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
                <ScrollArea.Root className="overflow-hidden bg-black grow" type="always">
                    <ScrollArea.Viewport className="size-full py-3 ps-3 pe-7">
                        {children}
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                        className="flex touch-none select-none bg-border-color p-1 data-[orientation=vertical]:w-4"
                        orientation="vertical"
                    >
                        <ScrollArea.Thumb className="relative flex-1 bg-red hover:bg-dark-red before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner />
                </ScrollArea.Root>
            </div>
        </div>
    )
}
