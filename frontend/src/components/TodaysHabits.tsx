import React from "react";
import Habit from "./Habit";

const TodaysHabits = ({ habit }) => {
  return (
    <div className="Card">
      <h1>Today`s habit</h1>
      <Habit title={habit.title} completed={habit.percentage} />
    </div>
  );
};

export default TodaysHabits;
