import "./Page.css";
import "./Home.css";
import HabitsCompletion from "../components/HabitsCompletion";
import CurrentStreakBlock from "../components/CurrentStreakBlock";
import Advice from "../components/Advice";
import TodaysHabits from "../components/TodaysHabits";
import Progress from "../components/Progress";
import QuickActions from "../components/QuickActions";
import Header from "../components/Header";
import { useAuth } from "../context/UserContext";
import { accessToken, apiClient } from "../utils/axios";
import { useEffect, useState } from "react";

const Home = () => {
  const { user } = useAuth();
  const [habit, setHabit] = useState([]);
  console.log(accessToken);
  console.log(user);

  async function getData() {
    const data = await apiClient.get("/goals/by-user-id");
    setHabit(data.data[Math.round(Math.random() * 5)]);
    console.log(habit);
  }
  console.log(user?.id);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page">
      <Header />

      <div className="data">
        <div className="quickData">
          <HabitsCompletion percent={20} />
          <CurrentStreakBlock />
          <Advice />
        </div>

        <div className="mainData">
          <div className="todaysHabits">
            <TodaysHabits habit={habit} />
          </div>

          <div className="progressAndActions">
            <Progress />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
