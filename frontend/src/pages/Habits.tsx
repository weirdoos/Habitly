import Header from "../components/Header";
import "./Page.css";
import "./Habits.css";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import Habit from "../components/Habit";
import Modal from "../components/Modal";
import { accessToken, apiClient } from "../utils/axios";
import { useAuth } from "../context/UserContext";
import type { AddHabit } from "../types/Data.types";

type Habits = {
  name: string;
  link?: string;
  category: string;
  id: string;
  isCompleted: boolean;
  percentage?: number;
};

const Habits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habits[]>([]);
  const [habitName, setHabitName] = useState<string>("");
  const [habitCategory, setHabitCategory] = useState<string>("");
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  console.log(habits);
  console.log(accessToken);

  async function getData() {
    const data = await apiClient.get("/goals/by-user-id");
    setHabits(data.data);
    console.log(data);
  }
  console.log(user?.id);
  useEffect(() => {
    getData();
  }, []);

  async function addHabit() {
    const newHabit: AddHabit = {
      title: habitName,
      category: habitCategory,
    };
    const data = apiClient.post("/goals/create", newHabit);
    getData();
  }

  return (
    <div className="page">
      <Modal
        name="Добавить привычку"
        isOpened={addModalOpen}
        setIsOpened={setAddModalOpen}
        onClick={addHabit}
      >
        <div className="label">
          <label htmlFor="nameInput">Habit name</label>
          <input
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            type="text"
            placeholder="walking..."
          />
        </div>

        <div className="label">
          <label htmlFor="categoryInput">Habit Category</label>
          <input
            value={habitCategory}
            onChange={(e) => setHabitCategory(e.target.value)}
            type="text"
            placeholder="sport..."
          />
        </div>
      </Modal>

      <Header />

      <div className="data">
        <Button
          name="+ add habit"
          classname="habitBtn"
          onClick={() => setAddModalOpen((prev) => !prev)}
        />
        <div className="habitsGrid">
          {habits.map((item) => {
            return <Habit title={item.title} category={item.category} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Habits;
