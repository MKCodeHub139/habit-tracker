import { useMutation, useQuery } from '@apollo/client/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGetUser from '../../hooks/analytics/headerCards/useGetUser'
import { IoIosAdd  } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa';
import { LogoutUser } from '../../graphql/mutations';



const Nav = () => {
  const {user} =useGetUser()
  const [Logout_User] =useMutation(LogoutUser)
  console.log(user?.getUser?.id)
  return (
    <div className="main text-base-100 sticky top-0 h-[3rem] flex items-center z-40">
    <nav className='flex justify-evenly items-center container mx-auto  bg-fuchsia-400 rounded-2xl mt-2 p-1'>
        <div className="logo"><h1 className='text-2xl'>
           <Link>Habit</Link> 
            </h1></div>
        <ul>
          { user ? (
      
            <li className='flex items-center gap-5'>
              <button className='text-4xl cursor-pointer border-1 hover:bg-fuchsia-100 hover:text-black hover:border-fuchsia-100 rounded-full px-3'>
                <Link to="/create"><IoIosAdd /></Link>
                </button>
                <p className='flex items-center gap-2 text-xl'><FaUserCircle />{user?.getUser?.name}</p>
             
                <button to="/logout" className='cursor-pointer border-1 hover:bg-red-400 hover:border-fuchsia-100 rounded-full py-1 px-3' onClick={()=>Logout_User({variables:{id:user?.getUser?.id}})}>Logout</button>
            </li>

       
          ):(
            <li>
            <div className="btns flex gap-4 h-[100%]">
                <button className='cursor-pointer border-1 hover:bg-fuchsia-100 hover:text-black hover:border-0 rounded-full py-1 px-3'>Signup</button>
                <button className='cursor-pointer border-1 hover:bg-fuchsia-100 hover:text-black hover:border-0 rounded-full py-1 px-3'>Login</button>
            </div>
            </li>
          )}
        </ul>
    </nav>
    </div>
  )
}

export default Nav