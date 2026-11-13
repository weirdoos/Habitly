import "./Habit.css";

type HabitProps = {
  link?: string;
  title: string;
  category: string;
  completed: number;
  onOpen: (value: React.SetStateAction<null>) => void;
  openDeleteModal: () => void;
};

const Habit = ({
  link,
  title,
  category,
  completed,
  openDeleteModal,
  onOpen,
}: HabitProps) => {
  const parsed = Number(completed);
  const percent = Number.isFinite(parsed)
    ? Math.min(100, Math.max(0, parsed))
    : 0;
  console.log(link);

  return (
    <div className="Habit" onClick={onOpen}>
      <div className="habitHeader">
        <h2>{title}</h2>
        <button className="btn" type="button" onClick={openDeleteModal}>
          <img src="/public/more.svg" />
        </button>
      </div>

      <div className="habitData">
        <div className="progressbar">
          <h3>{`${percent} %`}</h3>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={Math.round(percent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Прогресс: ${title}`}
          >
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <h3 className="category">{category}</h3>
      </div>
    </div>
  );
};

export default Habit;
