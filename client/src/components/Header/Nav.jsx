import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="main text-base-100 sticky top-0 h-[3rem] flex items-center">
    <nav className='flex justify-evenly items-center container mx-auto  bg-fuchsia-400 rounded-2xl'>
        <div className="logo"><h1 className='text-2xl'>
           <Link>Habit</Link> 
            </h1></div>
        <ul>
            <li className='text-4xl cursor-pointer'><Link to="/create">+</Link></li>
        </ul>
    </nav>
    </div>
  )
}

export default Nav