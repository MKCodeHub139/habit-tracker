import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen py-[4rem]">
    <div className='container mx-auto '>
      <div className='frequency-div flex gap-[5rem]'>
          <button className='cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded'>Today</button>
          <button className='cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded'>Weekly</button>
      </div>
      <div className="habits flex flex-wrap gap-5 my-11">
        <div className="category w-full">
          <h3 className='text-xl text-base-100'>Study</h3>
        </div>
        <div className="habit-card w-1/3 bg-fuchsia-400 text-white min-h-[10rem] rounded shadow-xl p-3 grow">
          <div className="title flex justify-between items-center w-[70%]">
            <h5 className='text-[1.2rem]'>Title</h5>
            <div className="achive-check flex flex-col">
              <label htmlFor="">Acheive</label>
              <input type="checkbox" />
            </div>
            </div>
          <div className="frequency"><p>Frequency</p></div>
          <div className="streak"><p>Streak</p></div>
          <div className="longest-streak"><p>longest Streak</p></div>
          <div className="action-btns flex justify-between items-center mt-4 ">
            <button className='bg-base-200 text-black hover:bg-base-300 px-5 cursor-pointer rounded'>View</button>
            <div className="complete-habit-check flex gap-2">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Complete</label>
            </div>
            <button className='bg-base-200 text-black hover:bg-base-400 px-5 cursor-pointer rounded'>Delete</button>
          </div>
        </div>
        <div className="habit-card w-1/3 bg-fuchsia-400 text-white min-h-[10rem] rounded shadow-xl p-3 grow">
          <div className="title flex justify-between items-center w-[70%]">
            <h5 className='text-[1.2rem]'>Title</h5>
            <div className="achive-check flex flex-col">
              <label htmlFor="">Acheive</label>
              <input type="checkbox" />
            </div>
            </div>
          <div className="frequency"><p>Frequency</p></div>
          <div className="streak"><p>Streak</p></div>
          <div className="longest-streak"><p>longest Streak</p></div>
          <div className="action-btns flex justify-between items-center mt-4 ">
            <button className='bg-base-200 text-black hover:bg-base-300 px-5 cursor-pointer rounded'>View</button>
            <div className="complete-habit-check flex gap-2">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Complete</label>
            </div>
            <button className='bg-base-200 text-black hover:bg-base-400 px-5 cursor-pointer rounded'>Delete</button>
          </div>
        </div>
        <div className="habit-card w-1/3 bg-fuchsia-400 text-white min-h-[10rem] rounded shadow-xl p-3 grow">
          <div className="title flex justify-between items-center w-[70%]">
            <h5 className='text-[1.2rem]'>Title</h5>
            <div className="achive-check flex flex-col">
              <label htmlFor="">Acheive</label>
              <input type="checkbox" />
            </div>
            </div>
          <div className="frequency"><p>Frequency</p></div>
          <div className="streak"><p>Streak</p></div>
          <div className="longest-streak"><p>longest Streak</p></div>
          <div className="action-btns flex justify-between items-center mt-4 ">
            <button className='bg-base-200 text-black hover:bg-base-300 px-5 cursor-pointer rounded'>View</button>
            <div className="complete-habit-check flex gap-2">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Complete</label>
            </div>
            <button className='bg-base-200 text-black hover:bg-base-400 px-5 cursor-pointer rounded'>Delete</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home