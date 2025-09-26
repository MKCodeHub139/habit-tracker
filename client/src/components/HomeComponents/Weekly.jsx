import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Daily = ({habit,today,handleDelete,handleComplete}) => {
                  console.log('j')
  
  return (
         <div className="habit-card w-1/3 bg-fuchsia-400 text-white min-h-[10rem] rounded shadow-xl p-3 grow">
                  <div className="title flex justify-between items-center w-[70%]">
                    <h5 className="text-[1.2rem] font-bold">{habit.title}</h5>
                    <div className="achive-check flex flex-col items-center">
                      <label htmlFor="">Acheive</label>
                      <input
                        type="checkbox"
                        className={`w-4 h-4 accent-fuchsia-500`}
                        onChange={(e) => handleComplete(e, habit)}
                        disabled={habit?.completedDates?.some(
                          (date) =>
                            new Date(date).toISOString().split("T")[0] === today
                        )}
                        checked={habit?.completedDates?.some(
                          (date) =>
                            new Date(date).toISOString().split("T")[0] === today
                        )}
                      />
                    </div>
                  </div>
                  <div className="frequency">
                    <p>Frequency : {habit.frequency}</p>
                  </div>
                  <div className="streak">
                    <p>Streak 🔥 : {habit.streak}</p>
                  </div>
                  <div className="longest-streak">
                    <p>longest Streak 🔥 : {habit.longestStreak} </p>
                  </div>
                  <div className="action-btns flex gap-9 items-center mt-4 ">
                    <Link
                      to={`/habit?habitId=${habit.id}`}
                      className="bg-base-200 text-black hover:bg-base-300 px-5 cursor-pointer rounded"
                    >
                      View
                    </Link>
                    <button
                      className="bg-base-200 text-black hover:bg-base-400 px-5 cursor-pointer rounded"
                      onClick={(e) => handleDelete(e, habit.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
   
  )
}

export default Daily