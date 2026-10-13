import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import Streak from './Streak'
import Profile from './Profile'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="up">
            <div className="logo">
                <img className='img' src="/public/favicon.png" alt="logo" />
                <h1>Habitly</h1>
            </div>
            <div className="pages">
                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='home'>Overview</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='habits'>Habits</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='calendar'>Calendar</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='analytics'>Analytics</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='settings'>Settings</NavLink>
            </div>
        </div>
        <div className="down">
            <Streak />
            <Profile />
        </div>
    </div>
  )
}

export default Sidebar