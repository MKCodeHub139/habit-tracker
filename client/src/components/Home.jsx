import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useRef, useState } from "react";
import { GetHabits } from "../graphql/queries";
import {
  UpdateCompleteDates,
  UpdateStreak,
  DeleteHabit,
} from "../graphql/mutations";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, error, loading } = useQuery(GetHabits, {
    variables: { userId: "68bacc259f8fdce8e0a209b2" },
  });
  const [Update_Complete_Dates] = useMutation(UpdateCompleteDates);
  const [Update_Streak] = useMutation(UpdateStreak);
  const [Delete_Habit] = useMutation(DeleteHabit);
  const today = new Date().toISOString().split("T")[0];
  // streak logic

  useEffect(() => {
    if (!data?.getHabits) return;

    data.getHabits.forEach((habit) => {
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
  }, [data]);

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
  //   const weeklyHabit=data?.getHabits?.filter((habit)=>{
  //       return habit.frequency =="weekly"
  //   })
  //   console.log(weeklyHabit)
  // }
  if (loading) return <h1>Loading</h1>;
  return (
    <div className="min-h-screen py-[4rem]">
      <div className="container mx-auto ">
        <div className="frequency-div flex gap-[5rem]">
          <button className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded">
            Today
          </button>
          <button className="cursor-pointer bg-fuchsia-400 text-base-100 hover:bg-fuchsia-300 py-1 px-5 rounded" /*onClick={handleShowWeekly}*/>
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
          {data?.getHabits?.map((habit) => {
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
