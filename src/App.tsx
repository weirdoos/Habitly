
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
