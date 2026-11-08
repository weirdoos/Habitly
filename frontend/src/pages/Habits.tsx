import Header from "../components/Header";
import "./Page.css";
import "./Habits.css";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import Habit from "../components/Habit";
import Modal from "../components/Modal";

type Habits = {
  name: string;
  link?: string;
  category: string;
  id: string;
  isCompleted: boolean;
  percentage?: number;
};

const Habits = () => {
  const url = import.meta.env.VITE_URL;
  const [habits, setHabits] = useState<Habits[]>([]);
  const [habitName, setHabitName] = useState<string>("");
  const [habitCategory, setHabitCategory] = useState<string>("");
  console.log(habits);

  return (
    <div className="page">
      <Modal
        name="удалить привычку"
        //closeModalCard=
        modalCardClass=""
        onClick=""
      >
        <button className="cancel" type="button">
          отменить
        </button>
        <button className="delete" type="button">
          удалить
        </button>
      </Modal>

      <Modal
        name="Добавить привычку"
        closeModalCard={closeModalCard}
        modalCardClass={modalCardClass}
        onClick={() => addHabit(habitName, habitCategory)}
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
          onClick={openModalCard}
        />
        <div className="habitsGrid">
          {habits.map((item) => {
            return (
              <Habit
                key={item.name}
                name={item.name}
                link={item.link}
                category={item.category}
                completed={item.completed}
                openDeleteModal={openModalCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Habits;
