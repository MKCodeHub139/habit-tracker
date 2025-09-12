import React from "react";

const Analytics = () => {
  return (
    <div className="min-h-screen py-[3rem]">
      <div className="container mx-auto ">
        <h2 className="text-3xl text-base-100">Analytics Page</h2>
        <hr className="mt-5 text-white" />
        <div className="header">
            <div className="header-cards w-full flex flex-wrap gap-3">
                <div className="overallCompletion-card border-2 hover:border-fuchsia-600 cursor-pointer  border-fuchsia-400 p-3 rounded-2xl my-5 min-w-1/5  grow min-h-[150px] text-white">
                    <p className="pb-5">Overall Completion</p>
                    <h2 className="font-extrabold text-2xl">70%</h2>
                    <p className="text-[14px] opacity-75">+5 from last month</p>
                    <div className="progress-line bg-gray-300 h-3 flex items-center rounded mt-3">
                    <input type="range" name="" id=""  className="appearance-none"/>
                    </div>
                </div>
                <div className="currentStreak-card border-2 hover:border-fuchsia-600 cursor-pointer border-fuchsia-400 p-3 rounded-2xl my-5 min-w-1/5  grow min-h-[150px] text-white">
                    <p className="pb-5">Current Streak</p>
                    <h2 className="font-extrabold text-2xl">12 days</h2>
                    <p className="text-[14px] opacity-75">Personal best: 18 days</p>
                </div>
                <div className="activeHabits-card border-2 hover:border-fuchsia-600 cursor-pointer border-fuchsia-400 p-3 rounded-2xl my-5 min-w-1/5  grow min-h-[150px] text-white">
                    <p className="pb-5">Active Habits</p>
                    <h2 className="font-extrabold text-2xl">5</h2>
                    <p className="text-[14px] opacity-75">2 new this month</p>
                </div>
                <div className="thisWeek-card border-2 hover:border-fuchsia-600 cursor-pointer border-fuchsia-400 p-3 rounded-2xl my-5 min-w-1/5  grow min-h-[150px] text-white">
                    <p className="pb-5">This Week</p>
                    <h2 className="font-extrabold text-2xl">32/35</h2>
                    <p className="text-[14px] opacity-75">91% completion rate</p>
                </div>
            </div>

        </div>
        <div className="habit-actions w-2/5 bg-fuchsia-400 h-8 rounded-full flex justify-around items-center text-white my-5">
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
