import React, { useMemo, useState } from "react";
import HeaderCard from "./Analytics components/HeaderCard";
import useAllHabits from "../hooks/analytics/headerCards/useAllHabits";
import useOverallCompletion from "../hooks/analytics/headerCards/useOverallCompletion";
const Analytics = () => {
  const { habits, isLoading, isError } = useAllHabits();
  const {
    lastMonthHabit,
    thisMonthOverallCompletion,
    lastMonthOverallCompletion,
    diff,
  } = useOverallCompletion(habits);
  // const today = new Date().toISOString().slice(0, 10);
  // const sevenDaysAgo = new Date();
  // sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  // const lastWeekHabits = habits?.getHabits?.filter((habit) => {
  //   return habit.completedDates?.some((date) => {
  //     const habitDate = new Date(date.split("T")[0]);
  //     return (
  //       habitDate >= sevenDaysAgo  && habitDate <= new Date()
  //     );
  //   });
  // }); 
  // const lastweek = lastWeekHabits?.reduce((sum, habit) => {
  //   return sum + (habit.completedDates?.length || 0);
  // },0)
  console.log(lastweek);
  console.log(lastWeekHabits);
   const { currentStreak, longestStreak } = useMemo(() => {
    let currentStreak = 0;
    let longestStreak = 0;
    habits?.getHabits?.map((habit) => {
      longestStreak = Math.max(longestStreak, habit?.longestStreak || 0);
      currentStreak = Math.max(currentStreak, habit?.streak || 0);
    });
    return { currentStreak, longestStreak };
  }, [habits, today]);

  const activeHabit = useMemo(() => {
   return habits?.getHabits?.reduce((count, habit) => {
      const lastDate = habit.completedDates[habit.completedDates.length - 1];
      return !(lastDate && lastDate.includes(today)) ? count + 1 : count;  
    }, 0);
  }, [habits, today]);
  const newHabit = habits?.getHabits?.reduce((count, habit) => {
    return today.slice(0, 7) == habit?.createdAt.slice(0, 7)
      ? count + 1
      : count;
  }, 0);
  return (
    <div className="min-h-screen py-[3rem]">
      <div className="container mx-auto ">
        <h2 className="text-3xl text-base-100">Analytics Page</h2>
        <hr className="mt-5 text-white" />
        <div className="header">
          <div className="header-cards w-full flex flex-wrap gap-3">
            <HeaderCard
              title="Overall Completion"
              value={`${thisMonthOverallCompletion}%`}
              subtitle={`${diff} from last month`}
              progress={thisMonthOverallCompletion}
            />
            <HeaderCard
              title="Current Streak"
              value={`${currentStreak} days`}
              subtitle={`Personal best: ${longestStreak} days`}
            />
            <HeaderCard
              title="Active Habits"
              value={activeHabit}
              subtitle={`${newHabit} new this month`}
            />
            <HeaderCard
              title="This Week"
              value={`32/35`}
              subtitle={`91% completion rate`}
            />
          </div>
        </div>
        <div className="habit-actions md:w-2/3 lg:w-2/5 sm:w-2/3 bg-fuchsia-400 h-8 rounded-full flex justify-around items-center text-white my-5">
          <button className="bg-fuchsia-500 px-2 rounded-full hover:bg-fuchsia-300 cursor-pointer">
            Overview
          </button>
          <button className=" px-2 rounded-full hover:bg-fuchsia-300 cursor-pointer">
            Habit Performance
          </button>
          <button className="px-2 rounded-full hover:bg-fuchsia-300 cursor-pointer">
            Calender View
          </button>
          <button className="px-2 rounded-full hover:bg-fuchsia-300 cursor-pointer">
            Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
