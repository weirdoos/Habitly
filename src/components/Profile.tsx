import { useEffect, useState } from 'react'
import './Sidebar.css'
import Avatar from './Avatar'

const Profile = () => {
    const [name, setName] = useState('')

    useEffect(() => {
        const user= localStorage.getItem('user')
        setName(JSON.parse(user).name)
        

    }, [])


  return (
    <div className="profile">
        <div className="left">
            <Avatar />
            <div className="username">{name}</div>
        </div>
        <div className="right">
            <p>+</p>
        </div>
    </div>
  )
}

export default Profile