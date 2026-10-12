import { useState } from "react"
import './Sign.css'
import { useNavigate } from "react-router-dom"
const SignUp = () => {
      
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [isLogged, setIsLogged] = useState(false)
      const [isVisiblePassword, setIsVisiblePassword] = useState(false)
      const navigate = useNavigate()
      
      
    
      async function fetchAddUser(email:string, password: string) {
    
        
        const response = await fetch(`http://localhost:3000/users?email=${email}`)
        const data = await response.json()
        const result = data[0]
        if(result.password === password) {
            setIsLogged(true)
            const { password , ...user } = result
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/home')
            setIsVisiblePassword(false)
            setEmail('')
            setPassword('')
        } else {
          setIsLogged(false)
        }
        console.log(isLogged)
        setEmail('')
        setPassword('')
        
        
      }
    
      return (
        <div className="sign">
          <div className="content">
                <div className="greetings">
                    <div className="logo">
                      <img src="favicon.png" style={{width: '70px', borderRadius: '20px'}} />
                      <h1>Habitly</h1>
                    </div>
                </div>


                <div className='createaccount'>
                  <h1>Log in</h1>
                  <h4 className="subtext">Welcome back! please enter your details to continue.</h4>
                  <div className="form">

                    <div className="email label">
                      <label htmlFor="email">Email address</label>
                      <input id="email" type="text" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    

                    <div className="password label">
                      <label htmlFor="password">Password</label>
                      <input id="password" type={isVisiblePassword ? "text" : "password"} placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button onClick={() => setIsVisiblePassword(prev => !prev)} type="button">show password</button>
                    </div>
                    <p style={{color: 'red'}}>{!isLogged ? 'Неверный пароль' : '' }</p>
                    
                    
                    <button className="signInBtn" onClick={() => fetchAddUser(email, password)}>Log in</button>
                    <p>Don`t have an account? <a className="link" href="/sign-up">Register</a></p>
                  </div>
                  
                
              </div>  
          </div>

          
        </div>
        
  )
}

export default SignUp