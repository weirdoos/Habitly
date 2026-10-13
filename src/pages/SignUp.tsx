import { useState } from "react"
import type { User } from "../types/Sign.types"
import './Sign.css'
import { useNavigate } from "react-router-dom"
const SignUp = () => {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [passwordError, setPasswordError] = useState('')
      const [isVisiblePassword, setIsVisiblePassword] = useState(false)
      const [isEmailSame, setIsEmailSame] = useState('')
      const navigate = useNavigate()
      
      
    
      async function fetchAddUser(name:string, email:string, password: string) {
        
        const newUser:User = {
            name: name,
            email: email,
            password: password,
            content: []
        }
        

        const response = await fetch(`http://localhost:3000/users?email=${email}`);
        const data = await response.json();

        
        if (Array.isArray(data) && data.length > 0) {
          setIsEmailSame('Аккаунт с такой эл.почтой уже создан');
          return; 
        }

        
        await fetch(`http://localhost:3000/users`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(newUser));

        setEmail('');
        setPassword('');
        setName('');

        navigate('/app/home');
 
      }

      function registration () {
        setIsEmailSame('')
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
          setPasswordError('Заполните все поля')
          return
        } else if (password.trim().length < 8) {
          setPasswordError('Слишком короткий пароль')
          return
        } else {
          fetchAddUser(name, email, password)
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
                      <input id="name" type="text" placeholder="Alex Johnson" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="email label">
                      <label htmlFor="email">Email address</label>
                      <input id="email" type="text" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
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