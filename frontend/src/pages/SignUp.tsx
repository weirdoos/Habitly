import { useState } from "react"
import type { User } from "../types/Sign.types"
import './Sign.css'
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
const SignUp = () => {
      const [inputName, setInputName] = useState('')
      const [inputEmail, setInputEmail] = useState('')
      const [password, setPassword] = useState('')
      const [passwordError, setPasswordError] = useState('')
      const [isVisiblePassword, setIsVisiblePassword] = useState(false)
      const [isEmailSame, setIsEmailSame] = useState('')
      const navigate = useNavigate()
      const {setIsLogged, setUsername, setEmail} = useUser()
      const URL = import.meta.env.VITE_URL
      
      
    
      async function fetchAddUser(name:string, email:string, password: string) {
        
        const newUser:User = {
            username: name,
            email: email,
            password: password,
            id: crypto.randomUUID(),
            
        }
        console.log(newUser)
        
        

        const findResponse = await fetch(`${URL}/api/signup?email=${encodeURIComponent(email)}`);
        
        if (findResponse.status === 409) {
          setIsEmailSame('Пользователь с таким email уже существует')
          return
        }

        if (findResponse.status !== 200) {
          setIsEmailSame(`Ошибка при проверке email: ${findResponse.status} ${findResponse.statusText}`);
          return
        }

        const createResponse = await fetch(`${URL}/api/users`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(newUser),
        });
        console.log(createResponse)
        setUsername(newUser.username)
        setEmail(newUser.email)
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(newUser))
        setInputEmail('');
        setPassword('');
        setInputName('');
        setIsLogged(true)
        navigate('/app/home');
 
      }

      function registration () {
        setIsEmailSame('')
        if (inputName.trim() === '' || inputEmail.trim() === '' || password.trim() === '') {
          setPasswordError('Заполните все поля')
          return
        } else if (password.trim().length < 8) {
          setPasswordError('Слишком короткий пароль')
          return
        } else {
          fetchAddUser(inputName, inputEmail, password)
        }
        
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
                  <h1>Create account</h1>
                  <h4 className="subtext">Join Habitly and start building your better tomorrow!</h4>
                  <p style={{color: 'red'}}>{ passwordError.trim() === '' ? '' : passwordError}</p>
                  <p style={{color: 'red'}}>{ isEmailSame.trim() === '' ? '' : isEmailSame}</p>
                  <div className="form">
                    <div className="name label">
                      <label htmlFor="name">Full Name</label>
                      <input id="name" type="text" placeholder="Alex Johnson" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                    </div>

                    <div className="email label">
                      <label htmlFor="email">Email address</label>
                      <input id="email" type="text" placeholder="you@example.com" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                    </div>
                    

                    <div className="password label">
                      <label htmlFor="password">Password</label>
                      <input id="password" type={isVisiblePassword ? "text" : "password"} placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button onClick={() => setIsVisiblePassword(prev => !prev)} type="button">show password</button>
                    </div>
                    
                    
                    
                    <button className="signInBtn" onClick={() => registration()}>Register</button>
                    <p>Already have an account? <a className="link" href="/sign-in">Login</a></p>
                  </div>
                  
                
              </div>  
          </div>

          
        </div>
        
  )
}

export default SignUp