import React from "react";
import HeaderCard from "./Analytics components/HeaderCard";
import useAllHabits from "../hooks/analytics/headerCards/useAllHabits";
import useOverallCompletion from "../hooks/analytics/headerCards/useOverallCompletion";
const Analytics = () => {
  const {habits, isLoading, isError} = useAllHabits()
  const {thisMonthOverallCompletion, diff} =useOverallCompletion(habits)


  return (
    <div className="min-h-screen py-[3rem]">
      <div className="container mx-auto ">
        <h2 className="text-3xl text-base-100">Analytics Page</h2>
        <hr className="mt-5 text-white" />
        <div className="header">
            <div className="header-cards w-full flex flex-wrap gap-3">
                <HeaderCard title="Overall Completion" value={`${thisMonthOverallCompletion}%`} subtitle={`${diff} from last month`} progress={thisMonthOverallCompletion}/>
                <HeaderCard title="Current Streak" value={`${12} days`} subtitle={`Personal best: 18 days`}/>
                <HeaderCard title="Active Habits" value={`5`} subtitle={`2 new this month`}/>
                <HeaderCard title="This Week" value={`32/35`} subtitle={`91% completion rate`}/>
         
            </div>

        </div>
        <div className="habit-actions md:w-2/3 lg:w-2/5 sm:w-2/3 bg-fuchsia-400 h-8 rounded-full flex justify-around items-center text-white my-5">
            <button className="bg-fuchsia-500 px-2 rounded-full hover:bg-fuchsia-300 cursor-pointer">Overview</button>
            <button className=" px-2 rounded-full hover:bg-fuchsia-300 cursor-pointer">Habit Performance</button>
            <button className="px-2 rounded-full hover:bg-fuchsia-300 cursor-pointer">Calender View</button>
            <button className="px-2 rounded-full hover:bg-fuchsia-300 cursor-pointer">Insights</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
