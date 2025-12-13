import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { NavigationMenu } from 'radix-ui'
import { Button } from './components'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="bg-midnight w-screen h-screen" id="monitor">
        <NavigationMenu.Root className="relative z-10 flex w-screen justify-left bg-black">
          <NavigationMenu.List className="center mb-0 mt-1 flex list-none rounded-none p-0">
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="block h-full content-center select-none rounded-none px-4 pt-1 pb-2 focus:shadow-[0_0_0_2px]"
                href="/"
              >
                <img src="/assets/phvt-triangle-white.svg" alt="Paul Van Tuyl" className="h-4" />
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="block select-none rounded-none ps-4 pe-12 py-2 text-base leading-none no-underline outline-none bg-red focus:shadow-[0_0_0_2px]"
                href="/"
              >
                Start
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="block select-none rounded-none ps-4 pe-12 py-2 text-base leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
                href="https://github.com/paulvantuyl"
              >
                Github
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex flex-row p-2" id="content">
          <div className="basis-3/3">
            <h1>Hello, World</h1>
            <p><strong>Can</strong> enterprise software <em>be</em> interesting?</p>
            <p>
                <Button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </Button>
            </p>
            <p><small>This is a small text</small></p>
            
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
