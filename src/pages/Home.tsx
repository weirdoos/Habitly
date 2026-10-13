import { useEffect, useState } from "react"
import './Page.css'
import Avatar from "../components/Avatar"

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

  const date = Date()


  return (
    <div className="page">
      <div className="firststroke">

        <div className="greetings">
          <h1>Welcome, { isLogged ? user : 'Guest'}</h1>
          <h4>Small steps make a big changes</h4>
        </div>

        <div className="buttons">
          <div className="date">{date}</div>
          <div className="notif">
            <button>+</button>
          </div>
          <div className="avatar">
            <Avatar />
          </div>

        </div>



      </div>
      
    </div>
  )
}

export default Home