
import './Page.css'
import './Home.css'
import HabitsCompletion from "../components/HabitsCompletion"
//import { useUser } from '../context/UserContext'
import CurrentStreakBlock from '../components/CurrentStreakBlock'
import Advice from '../components/Advice'
import TodaysHabits from '../components/TodaysHabits'
import Progress from '../components/Progress'
import QuickActions from '../components/QuickActions'
import Header from '../components/Header'

const Home = () => {
  //const { username, isLogged } = useUser()
  

  

  


  return (
    <div className="page">
      <Header />
      
    <div className="data">
      <div className="quickData">
        <HabitsCompletion percent={20} />
        <CurrentStreakBlock />
        <Advice />
      </div>

      <div className="mainData">

        <div className="todaysHabits">
            <TodaysHabits />
        </div>

        <div className="progressAndActions">
            <Progress />
            <QuickActions />
        </div>

      </div>
      
    </div>


    </div>
  )
}

export default Home