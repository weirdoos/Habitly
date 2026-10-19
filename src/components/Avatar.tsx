import { useUser } from '../context/UserContext'
import './Sidebar.css'

const Avatar = () => {

  const { username } = useUser()

  return (
    <div className="avatar">{username !== null ? username[0].toUpperCase() : ''}</div>
  )
}

export default Avatar