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
                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='home'>
                    <img src="/public/overview.svg" alt=""  />
                    <h3>Overview</h3>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='habits'>
                    <img src="/public/habits.svg" alt=""  />
                    <h3>Habits</h3>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='calendar'>
                    <img src="/public/calendar.svg" alt=""  />
                    <h3>Calendar</h3>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='profile'>
                    <img src="/public/profile.svg" alt=""  />
                    <h3>Profile</h3>
                </NavLink>

                <NavLink className={({ isActive }) => isActive ? 'Link active' : 'Link'} to='settings'>
                    <img src="/public/settings.svg" alt=""  />
                    <h3>Settings</h3>
                </NavLink>

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