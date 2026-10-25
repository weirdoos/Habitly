interface Habit {
    link?:string,
    name:string,
    completed?:string,
    category:string,
    openDeleteModal: () => void
}

import './Habit.css'

const Habit = ({link, name, category, completed, openDeleteModal}:Habit) => {
    const parsed = Number(completed)
  const percent = Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : 0
    console.log(link)
    

  return (
    <div className='Habit'>
        <div className="habitHeader">
            <h2>{name}</h2>
            <button className='btn' type="button" onClick={openDeleteModal}>
                <img  src='/public/more.svg' />
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
                    aria-label={`Прогресс: ${name}`}
                    >
                    <div
                        className="progress-fill"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
            <h3 className='category'>{category}</h3>
        </div>
    </div>
  )
}

export default Habit