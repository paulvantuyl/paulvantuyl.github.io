import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { NavigationMenu } from 'radix-ui'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="bg-midnight w-screen h-screen">
      <NavigationMenu.Root className="relative z-10 flex w-screen justify-left bg-black">
        <NavigationMenu.List className="center m-0 flex list-none rounded-none p-1">
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="block select-none rounded-none px-4 py-2 text-sm leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
              href="https://github.com/paulvantuyl"
            >
              Github
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          
        </NavigationMenu.List>
      </NavigationMenu.Root>

      <div className="flex flex-row">
        <div className="basis-3/3">
          <h1>Hello, World</h1>
          <p><strong>Can</strong> enterprise software <em>be</em> interesting?</p>
          <p>
              <button className="rounded-none" onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
          </p>
          <p><small>This is a small text</small></p>
          
        </div>
      </div>
      </div>
    </ThemeProvider>
  )
}

export default App
