interface Habit {
    link?:string,
    name:string,
    completed?:string,
    category:string,
}

import './../pages/Habits.css'

const Habit = ({link, name, category}:Habit) => {


    function openHabitCard () {

    }

  return (
    <div className='Habit'>
        <div className="habitHeader">
            <img src={link} alt="habit icon" />
            <button type="button" onClick={openHabitCard}>
                +
            </button>
        </div>

        <div className="habitData">
            <h2>{name}</h2>
            <h3>{category}</h3>
        </div>
    </div>
  )
}

export default Habit