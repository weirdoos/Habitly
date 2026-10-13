import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import './Layout.css'


const Layout = () => {
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