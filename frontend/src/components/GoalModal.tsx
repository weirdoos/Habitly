import { useState } from "react";
import { apiClient } from "../utils/axios";
import "./Modal.css";
import Task from "./Task";

const GoalModal = ({ habit, onClose, getData }) => {
  const [taskTitle, setTaskTitle] = useState("");

  function addTask() {
    const newTask = {
      title: taskTitle,
    };
    apiClient.post(`/task/create?goalId=${habit.id}`, newTask);
    getData();
  }

  return (
    <div className="modalHabit">
      <header className="header">
        <h1>{habit.title}</h1>
        <button className="modalBtn" onClick={onClose}>
          x
        </button>
      </header>
      <section>
        <div className="addTask">
          <input
            className="inputTaskTitle"
            type="text"
            value={taskTitle}
            placeholder="title..."
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <button
            className="modalConfirmTaskTitle"
            type="button"
            onClick={addTask}
          >
            создать
          </button>
        </div>
        <div className="taskGrid">
          {habit.tasks.map((item) => {
            return (
              <Task
                title={item.title}
                id={item.id}
                isCompleted={item.isCompleted}
              />
            );
          })}
        </div>
      </section>
      <footer></footer>
    </div>
  );
};

export default GoalModal;
