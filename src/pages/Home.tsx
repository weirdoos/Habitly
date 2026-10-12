import { useEffect, useState } from "react"


const Home = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    if(localStorage.getItem('user')) {
      const rawData = localStorage.getItem('user')
      const user = JSON.parse(rawData)
      console.log(user.name)
      setUser(user.name)
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
    
  }, [])
  return (
    <div className="home">Welcome, { isLogged ? user : 'Guest'}</div>
  )
}

export default Home