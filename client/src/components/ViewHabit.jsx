import React, { useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import { GetHabit } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client/react';
import Calendar from 'react-calendar';
import '../calendar.css'
import 'react-calendar/dist/Calendar.css';
import { UpdateCompleteDates } from '../graphql/mutations';
const ViewHabit = () => {
const [value, onChange] = useState(new Date())
  const [serachParam] =useSearchParams()
  const id =serachParam.get('habitId')
  const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
  const lastDate = new Date(year, month + 1, 0).getDate();
  console.log(lastDate)
  const {data, error, loading} = useQuery(GetHabit,{
    variables:{id}
  })
    const completedDates = data?.getHabit?.completedDates.length || 0;
  const [Update_Complete_Dates] = useMutation(UpdateCompleteDates);
      const handleComplete = async (e) => {
    if (e.target.checked) {
      const updateComplete = await Update_Complete_Dates({
        variables: {
          input: {
            id: id,
            completedDates: today,
          },
        },
      });
    }
  };
  return (
    <div className='min-h-screen py-[4rem]'>
        <div className="container mx-auto">
        <h2 className='text-3xl text-base-100'>Habit Page</h2><hr className='mt-5 text-white'/>
      <div className="view-card min-h-[70vh] min-w-[90vw] bg-fuchsia-400 mt-9 rounded p-5">
        <div className="habit-head flex justify-between items-center">
        <h2 className='text-2xl text-base-100'>{data?.getHabit?.title}</h2>
        <div className="actions flex gap-5">
          <div className="complete flex flex-col items-center">
          <label htmlFor="">Achieve</label>
          <input type="checkbox" name="" id=""onChange={handleComplete}
                      disabled={data?.getHabit?.completedDates?.some(
                        (date) =>
                          new Date(date).toISOString().split("T")[0] === today
                      )}
                      checked={data?.getHabit?.completedDates?.some(
                        (date) =>
                          new Date(date).toISOString().split("T")[0] === today
                      )}/>
          </div>
          <button className='bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer px-5 rounded text-white '>Edit</button>
          <button className='bg-pink-500 hover:bg-pink-400 cursor-pointer px-5 rounded text-white'>Delete</button>
        </div>
        </div>
        <div className="details  text-white flex mt-5 flex-col gap-3">
          <p><span className='font-[600]'>Category :</span> <span className='bg-fuchsia-300 px-3 rounded-2xl py-[2px] text-black mx-3'>{data?.getHabit?.category}</span></p>
          <p><span className='font-[600]'>Frequency :</span> <span className='bg-fuchsia-300 px-3 rounded-2xl py-[2px] text-black mx-3'>{data?.getHabit?.frequency}</span></p>
          {data?.getHabit?.frequency !=="Daily" && (
            <p><span className='font-[600]'>Selected Days :</span> <span className='bg-fuchsia-300 px-3 rounded-2xl py-[2px] text-black mx-3'>{data?.getHabit?.selectedDays?.join(' , ')}</span></p>
          )}
          <p><span className='font-[600]'>Current Streak 🔥 : </span> <span className='bg-fuchsia-300 px-3 rounded-2xl py-[2px] text-black mx-3'>{data?.getHabit?.streak} days</span> </p>
          <p><span className='font-[600]'>Longest Streak 🔥 : </span> <span className='bg-fuchsia-300 px-3 rounded-2xl py-[2px] text-black mx-3'>{data?.getHabit?.longestStreak} days</span> </p>
        </div>
        <div className="progres-bar mt-5 flex items-center gap-3 text-white h-[5rem]">
          <label htmlFor=""> Progress Bar</label>
          <input type="range" name="" id="" className='w-1/2 text-fuchsia-600 appearance-none background: transparent cursor: pointer bg-fuchsia-950 rounded-2xl 'min={0} max={30} value={completedDates}/>
          <label htmlFor="">{completedDates}/{lastDate}</label>
        </div>
         <div>
      <Calendar onChange={onChange} value={value} className="rounded-xl" selectRange={false}
     tileClassName={({ date }) => {
      const completedDates = data?.getHabit?.completedDates?.map(d => d.split("T")[0]) ||[];
    const dateStr = date.toLocaleDateString("en-CA"); // local YYYY-MM-DD
    if (completedDates.includes(dateStr)) {
      return "text-white rounded-full react-calender";
    }
    return null;
  }}
      

      />
    </div>
      </div>
        </div>
    </div>
  )
}

export default ViewHabit