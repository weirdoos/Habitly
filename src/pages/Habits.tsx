import Header from "../components/Header"
import './Page.css'
import './Habits.css'
import Button from "../components/Button"
import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"
import Habit from "../components/Habit"
import { useModal } from "../context/ModalContext"
import Modal from "../components/Modal"

type Habits = {name:string, link?:string, category:string}

const Habits = () => {
  const url = import.meta.env.VITE_URL
  const {email, id} = useUser()
  const [habits, setHabits] = useState<Habits[]>([])
  const [habitName, setHabitName] = useState<string>('')
  const [habitCategory, setHabitCategory] = useState<string>('')
  const { modalCardClass, closeModalCard, openModalCard } = useModal()
  console.log(id)
  console.log(email)

  
  

  
  
  
    useEffect(() => {
      async function fetchHabits() {
        try{
          const response = await fetch(`${url}/users?email=${email}`)
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
          }

          const data = await response.json()
          setHabits(data[0].content.habits)
        } catch(error) {
            console.log(error.message)
        }
      }
      fetchHabits()
    }, [])

    async function addHabit (name:string, category:string) {
      const newHabit:Habits = {
        name:name,
        category:category
      }

      const response = await fetch(`${url}/users/${id}/content/habits`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newHabit)
      })
      setHabits(prev => [...prev, newHabit])
      console.log(response.status)
  }

    


  return (
    <div className="page">

      
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
              return <Habit key={item.id} name={item.name} link={item.link} category={item.category}  />
            })}
        </div>
          
        
      </div>
    </div>
    
  )
}

export default Habits