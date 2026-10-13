import { useEffect, useState } from "react"
import './Page.css'
import './Home.css'
import Avatar from "../components/Avatar"
import Clock from "../components/Date"
import HabitsCompletion from "../components/HabitsCompletion"

const Home = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    if(localStorage.getItem('user')) {
      const rawData:string | null = localStorage.getItem('user')
      const user = JSON.parse(rawData)
      setUser(user.name)
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
    
  }, [])

  


  return (
    <div className="page">
      <div className="firststroke">

        <div className="greetings">
          <h1>Welcome, { isLogged ? user : 'Guest'}</h1>
          <h4>Small steps make a big changes</h4>
        </div>

        <div className="buttons">
          <div className="date"><Clock /></div>
          <div className="notif">
            <>+</>
          </div>
          <div className="avatar">
            <Avatar />
          </div>

        </div>



      </div>
      
    <div className="data">
      <HabitsCompletion percent={20} />
    </div>


    </div>
  )
}

export default Home