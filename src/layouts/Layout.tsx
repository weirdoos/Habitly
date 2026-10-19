import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import './Layout.css'
import { useUser } from "../context/UserContext"
import { useEffect } from "react"


const Layout = () => {
  const {isLogged} = useUser()
  const navigate = useNavigate()
  console.log(isLogged)

  useEffect(() => {
    if (isLogged === false) {
        navigate('/sign-in')
  }},[]) 
  

  return (
    <div className="layout">

        <Sidebar />

        
        <main>
            <Outlet />
        </main>
        
        

    </div>
  )
}

export default Layout