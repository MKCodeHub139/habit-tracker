import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useRef, useState } from "react";
import { GetHabits } from "../graphql/queries";
import {
  UpdateCompleteDates,
  UpdateStreak,
  DeleteHabit,
} from "../graphql/mutations";
import { Link } from "react-router-dom";
import useAllHabits from "../hooks/analytics/headerCards/useAllHabits";
import Daily from "./HomeComponents/Daily";
import Weekly from "./HomeComponents/Weekly";

const Home = () => {
  const todayDay=new Date().toLocaleString('en-US',{weekday:'long'}).toLocaleLowerCase()
  // const { habits, error, loading } = useQuery(GetHabits, {
  //   variables: { userId: "68bacc259f8fdce8e0a209b2" },
  // });
  const {habits,isError,isLoading} =useAllHabits()
  const [activeHabit,setActiveHabit] =useState('Daily')
  console.log(habits)
  const [Update_Complete_Dates] = useMutation(UpdateCompleteDates);
  const [Update_Streak] = useMutation(UpdateStreak);
  const [Delete_Habit] = useMutation(DeleteHabit);
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
  // day by sorting
  // const handleShowWeekly =(e)=>{
  //   e.preventDefault()
  //   const weeklyHabit=habits?.getHabits?.filter((habit)=>{
  //       return habit.frequency =="weekly"
  //   })
  //   console.log(weeklyHabit)
  // }
  console.log(activeHabit)
  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="min-h-screen py-[4rem]">
      <div className="container mx-auto ">
        <div className="frequency-div flex gap-[5rem]">
          <button className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded"onClick={()=>setActiveHabit('Daily')}>
            Today
          </button>
          <button className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded" onClick={()=>setActiveHabit('Weekly')} >
            Weekly
          </button>
          <Link to="/analytics" className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded">
            OverAll
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
