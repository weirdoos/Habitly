
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Habits from './pages/Habits'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/app' element={<Layout />} >
          <Route path='home' element={<Home />} />
          <Route path='habits' element={<Habits />} />
        </Route >
      </Routes>
    </BrowserRouter>
  )
}

export default App
