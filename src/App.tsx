import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Home, Colors } from './pages'
import './App.css'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/colors" element={<Colors />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
