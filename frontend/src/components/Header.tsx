
import Avatar from './Avatar'
import Clock from './Date'
import { useUser } from '../context/UserContext'

const Header = () => {

    const {isLogged, username} = useUser()

  return (
    <div className="header">

        <div className="greetings">
          <h1>Welcome, { isLogged ? username : 'Guest'}</h1>
          <h4>Small steps make a big changes</h4>
        </div>

        <div className="buttons">
          <div className="date"><Clock /></div>
          <div className="notif">
            <img src='\public\notification.svg' ></img>
          </div>
          <div className="avatar">
            <Avatar />
          </div>

        </div>



      </div>
  )
}

export default Header