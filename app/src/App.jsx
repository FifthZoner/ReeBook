import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonUsage from './ui/button'
import Footer from './ui/footer'
import Hero from './ui/hero'
import SignInSide from './pages/signIn'

function App() {
  const [count, setCount] = useState(0)

  return (
      <h1>
        <Hero />
        <SignInSide />
        <Footer />
      </h1> 
  )
}

export default App
