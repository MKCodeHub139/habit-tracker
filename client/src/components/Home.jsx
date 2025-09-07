import { useMutation, useQuery } from "@apollo/client/react";
import React, { useState } from "react";
import { GetHabits } from "../graphql/queries";
import { UpdateCompleteDates } from "../graphql/mutations";

const Home = () => {
  const { data, error, loading } = useQuery(GetHabits, {
    variables: { userId: "68bacc259f8fdce8e0a209b2" },
  });
  const [Update_Complete_Dates] = useMutation(UpdateCompleteDates);
  const today = new Date().toISOString().split("T")[0];
  // let isCompleted;
  const handleComplete = async (e, habit) => {
    //  isCompleted =habit?.completedDates?.includes(today)
    if (e.target.checked) {
      const updateComplete=await Update_Complete_Dates({variables:{
        input:{
          id:habit.id,
          completedDates:today
        }
      }})
    }
   
  };
  if (loading) return <h1>Loading</h1>;
  return (
    <div className="min-h-screen py-[4rem]">
      <div className="container mx-auto ">
        <div className="frequency-div flex gap-[5rem]">
          <button className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded">
            Today
          </button>
          <button className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded">
            Weekly
          </button>
        </div>
        <div className="habits flex flex-wrap gap-5 my-11">
          <div className="category w-full">
            <h3 className="text-xl text-base-100">Study</h3>
          </div>
          {data.getHabits?.map((habit) => {
            return (
              <div className="habit-card w-1/3 bg-fuchsia-400 text-white min-h-[10rem] rounded shadow-xl p-3 grow">
                <div className="title flex justify-between items-center w-[70%]">
                  <h5 className="text-[1.2rem] font-bold">{habit.title}</h5>
                  <div className="achive-check flex flex-col">
                    <label htmlFor="">Acheive</label>
                    <input
                      type="checkbox"
                      className='"w-4 h-4 accent-fuchsia-500'
                      onChange={(e)=>handleComplete(e,habit)}
                      // disabled={isCompleted}
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
                  <p>longest Streak 🔥 : 0 </p>
                </div>
                <div className="action-btns flex gap-9 items-center mt-4 ">
                  <button className="bg-base-200 text-black hover:bg-base-300 px-5 cursor-pointer rounded">
                    View
                  </button>
                  <button className="bg-base-200 text-black hover:bg-base-400 px-5 cursor-pointer rounded">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
