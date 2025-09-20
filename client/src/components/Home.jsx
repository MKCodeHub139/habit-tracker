import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useRef, useState } from "react";
import { GetHabits } from "../graphql/queries";
import { IoIosLogIn, IoIosToday } from "react-icons/io";
import {
  UpdateCompleteDates,
  UpdateStreak,
  DeleteHabit,
} from "../graphql/mutations";
import { Link, useNavigate } from "react-router-dom";
import useAllHabits from "../hooks/analytics/headerCards/useAllHabits";
import Daily from "./HomeComponents/Daily";
import Weekly from "./HomeComponents/Weekly";
import useGetUser from "../hooks/analytics/headerCards/useGetUser";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";

const Home = () => {
  const {user} =useGetUser()
  const todayDay=new Date().toLocaleString('en-US',{weekday:'long'}).toLocaleLowerCase()
  const {habits,isError,isLoading} =useAllHabits()
  const [activeHabit,setActiveHabit] =useState('Daily')
  const [Update_Complete_Dates] = useMutation(UpdateCompleteDates);
  const [Update_Streak] = useMutation(UpdateStreak);
  const [Delete_Habit] = useMutation(DeleteHabit);
  const navigate =useNavigate()
  const today = new Date().toISOString().split("T")[0];
  // streak logic

  useEffect(() => {
    if (!habits?.getHabits) return;

    habits.getHabits.forEach((habit) => {
      if (!habit?.completedDates?.length) return;

      const sortedDates = habit.completedDates
        .map((d) => new Date(d.split("T")[0]))
        .sort((a, b) => a - b);

      let streak = 1;
      let longestStreak = 1;

      for (let i = 1; i < sortedDates.length; i++) {
        const diff = sortedDates[i] - sortedDates[i - 1];

        if (diff === 86400000) {
          streak += 1;
        } else if (diff > 86400000) {
          streak = 1;
        } else {
          continue;
        }

        if (streak > longestStreak) {
          longestStreak = streak;
        }
      }

      Update_Streak({
        variables: {
          input: {
            id: habit.id,
            streak,
            longestStreak,
          },
        },
      });
    });
  }, [habits]);

  const handleComplete = async (e, habit) => {
    if (e.target.checked) {
      const updateComplete = await Update_Complete_Dates({
        variables: {
          input: {
            id: habit.id,
            completedDates: today,
          },
        },
      });
    }
  };
  // delete Habit
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const deleteHabit = await Delete_Habit({
      variables: {
        id,
      },
    });
    return deleteHabit;
  };
 useEffect(() => {
    if (!user && isLoading==false) {
      navigate("/login",); 
    }
  }, [user, navigate]);
  if (isLoading) return <h1>Loading</h1>;
  if(!habits?.getHabits?.length >0) return <div className="w-full h-screen p-5 text-xl text-white text-center ">No habits found!</div>
  return (
    <div className="min-h-screen py-[4rem]">
      <div className="container mx-auto ">
        <div className="frequency-div flex gap-[4rem]">
          <button className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded flex items-center gap-2"onClick={()=>setActiveHabit('Daily')}>
            <IoIosToday />Today
          </button>
          <button className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded flex items-center gap-2" onClick={()=>setActiveHabit('Weekly')} >
            <FaCalendarWeek />Weekly
          </button>
          <Link to="/analytics" className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded flex items-center gap-2">
            <MdOutlineAnalytics /> OverAll
          </Link>
        </div>
        <div className="habits flex flex-wrap gap-5 my-11">
          <div className="category w-full">
            <h3 className="text-xl text-base-100">Study</h3>
          </div>
          {habits?.getHabits?.map((habit) => {
              if (habit?.selectedDays?.includes(todayDay) && activeHabit ==="Daily") 
               return <Daily habit={habit} today={today} handleComplete={handleComplete} handleDelete={handleDelete}/>
              if(activeHabit ==="Weekly" && !habit?.selectedDays?.includes(todayDay)){
               return <Weekly habit={habit} today={today} handleComplete={handleComplete} handleDelete={handleDelete}/>
              }
            
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
