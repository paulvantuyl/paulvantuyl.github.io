import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Post, Work, Weblog } from './pages'
import { ThemeProvider } from './theme'
import './App.css'

function App() {
  return (
    <ThemeProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Work" element={<Work />} />
              <Route path="/Weblog" element={<Weblog />} />
              <Route path="/weblog" element={<Weblog />} />
              <Route path="/Weblog/:slug" element={<Post />} />
              <Route path="/weblog/:slug" element={<Post />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
