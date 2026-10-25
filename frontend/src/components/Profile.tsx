
import './Sidebar.css'
import Avatar from './Avatar'
import { useUser } from '../context/UserContext'

const Profile = () => {
    
    const { username } = useUser()
    


  return (
    <div className="profile">
        <div className="left">
            <Avatar />
            <div className="username">{username}</div>
        </div>
        <div className="right">
            <p>+</p>
        </div>
    </div>
  )
}

export default Profile