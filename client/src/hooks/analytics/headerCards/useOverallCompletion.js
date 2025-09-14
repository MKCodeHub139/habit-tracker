function useOverallCompletion(habits) {
  const lastMonthHabit = habits?.getHabits?.filter((habit) => {
    return habit.completedDates?.some((date) => {
      const d = new Date();
      d.setMonth(d.getMonth() - 1);
      return date.split("T")[0].slice(0, 7) == d.toISOString().slice(0, 7);
    });
  });
  // const thisMonthHabits = habits?.getHabits?.filter((habit) => {
  //   return habit.completedDates?.some((date) => {
  //     return (
  //       date.split("T")[0].slice(0, 7) == new Date().toISOString().slice(0, 7)
  //     );
  //   });
  // });
  const thisMonthTotalComletedHabits = habits?.getHabits?.reduce((sum, habit) => {
    return sum + (habit.completedDates?.length || 0);
  }, 0);
  const lastMonthTotalCompletedHabits = lastMonthHabit?.reduce((sum, habit) => {
    return sum + (htalCompleteabit.completedDates?.length || 0);
  }, 0);
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() - 1;
  const lastMontnDays = new Date(year, month + 1, 0).getDate();
  const thisMonthtotalPossibleCompletions =
    habits?.getHabits?.length * new Date().getDate();
  const lastMonthtotalPossibleCompletions =
    lastMonthHabit?.length * lastMontnDays;

  const thisMonthOverallCompletion =
    thisMonthTotalComletedHabits > 0
      ? Math.round(
          (thisMonthTotalComletedHabits / thisMonthtotalPossibleCompletions) *
            100
        )
      : 0;
  const lastMonthOverallCompletion =
    lastMonthTotalCompletedHabits > 0
      ? Math.round(
          (lastMonthTotalCompletedHabits / lastMonthtotalPossibleCompletions) *
            100
        )
      : 0;

  let diff;
  if (lastMonthOverallCompletion > thisMonthOverallCompletion) {
    diff = `-${lastMonthOverallCompletion - thisMonthOverallCompletion}`;
  } else {
    diff = `+${thisMonthOverallCompletion - lastMonthOverallCompletion}`;
  }

  return {
    lastMonthHabit,
    thisMonthOverallCompletion,
    lastMonthOverallCompletion,
    diff,
  };
}
export default useOverallCompletion;
