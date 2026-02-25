import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Home, Work } from './pages'
import './App.css'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Work" element={<Work />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
