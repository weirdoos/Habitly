import Header from "../components/Header"
import './Page.css'
import './Habits.css'
import Button from "../components/Button"
import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"
import Habit from "../components/Habit"
import { useModal } from "../context/ModalContext"
import Modal from "../components/Modal"


type Habits = {name:string, link?:string, category:string, id:string, isCompleted:boolean, percentage?:number, }

const Habits = () => {
  const url = import.meta.env.VITE_URL
  const {email, id} = useUser()
  const [habits, setHabits] = useState<Habits[]>([])
  const [habitName, setHabitName] = useState<string>('')
  const [habitCategory, setHabitCategory] = useState<string>('')
  const { modalCardClass, closeModalCard, openModalCard } = useModal()
  console.log(id)
  console.log(email)
  console.log(habits)

  
  

  
  
  


useEffect(() => {
  let cancelled = false;

  async function fetchHabits() {
    try {
      const response = await fetch(`${url}/users?email=${email}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      
      const fetchedHabits = data?.[0]?.habits;
      if (!cancelled) {
        setHabits(Array.isArray(fetchedHabits) ? fetchedHabits : []);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(message);
      if (!cancelled) setHabits([]);
    }
  }

  fetchHabits();

  
  return () => { cancelled = true; };
  }, []);

    async function addHabit (name:string, category:string, ) {
      const newHabit:Habits = {
        id: crypto.randomUUID(),
        name:name,
        category:category,
        isCompleted: false,
        percentage: 0
        
      }

      const updatedHabits = [...habits, newHabit]
      setHabits(updatedHabits)
      const response = await fetch(`${url}/api/habits?email=${encodeURIComponent(email)}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({habits: updatedHabits})
      })
      
      console.log(response)
      closeModalCard()
      setHabitName('')
      setHabitCategory('')
  }

    


  return (
    <div className="page">

        <Modal name="удалить привычку" closeModalCard={closeModalCard} modalCardClass={modalCardClass} onClick={() => addHabit(habitName, habitCategory)}   >
          <button className="cancel" type="button">отменить</button>
          <button className="delete" type="button">удалить</button>
        </Modal>

      
        <Modal name="Добавить привычку" closeModalCard={closeModalCard} modalCardClass={modalCardClass} onClick={() => addHabit(habitName, habitCategory)} >
            <div className="label">
              <label htmlFor="nameInput">Habit name</label>
              <input value={habitName} onChange={(e) => setHabitName(e.target.value)} type="text" placeholder="walking..." />
            </div>

            <div className="label">
              <label htmlFor="categoryInput">Habit Category</label>
              <input value={habitCategory} onChange={(e) => setHabitCategory(e.target.value)} type="text" placeholder="sport..." />
            </div>

            
            
        </Modal>
              
            
      
        
      
        

      <Header />
      
      <div className="data">
        <Button name='+ add habit' classname='habitBtn' onClick={openModalCard} />
        <div className="habitsGrid">
            {habits.map((item) => {
              return <Habit key={item.name} name={item.name} link={item.link} category={item.category} completed={item.completed} openDeleteModal={openModalCard} />
            })}
        </div>
          
        
      </div>
    </div>
    
  )
}

export default Habits