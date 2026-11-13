const Task = ({ title, id, isCompleted }) => {
  return (
    <div className="TaskCard">
      <div className="left">
        <input
          type="checkbox"
          name="isCompleted"
          id={id}
          checked={isCompleted}
        />
        <h3>{title}</h3>
      </div>
      <div className="right">
        <button type="button" className="modalBtn">
          x
        </button>
      </div>
    </div>
  );
};

export default Task;
