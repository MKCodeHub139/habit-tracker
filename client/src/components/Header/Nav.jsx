import { useQuery } from '@apollo/client/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { GetUser } from '../../graphql/queries'
import useAllHabits from '../../hooks/analytics/headerCards/useAllHabits'

const Nav = () => {
  // const {habits} =useAllHabits()
  return (
    <div className="main text-base-100 sticky top-0 h-[3rem] flex items-center z-40">
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