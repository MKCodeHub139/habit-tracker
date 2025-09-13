import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Nav from './components/Header/Nav'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    <div className="main bg-fuchsia-500 min-h-screen">
    <Nav/>
      <Outlet/>
    </div>
    </>
  )
}

export default App
