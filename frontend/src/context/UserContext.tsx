import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '../types/Sign.types';

interface UserContextValue {
  username: string | null;
  setUsername: (name: string | null) => void;
  isLogged: boolean;
  setIsLogged: (v: boolean) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  email:string | null,
  setEmail: (email: string | null ) => void;
  id: string | null,
  setId: (id: string | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [email, setEmail] = useState<string | null>(null)
  
 


    useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    }, [user]);


    const [isLogged, setIsLogged] = useState<boolean>(() => {
        
        return user ? true : false
    })
    const [username, setUsername] = useState<string | null>(() => { 
        return user?.username ? user.username : null
    })
    
    

    const [id, setId] = useState<string | null>(null)

    
    console.log('UserContext rendered with user:', user);
    

    
    


  return (
    <UserContext.Provider value={{ username, setUsername, setIsLogged, isLogged, email, id }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error('useUser должен быть внутри UserProvider');
    return ctx
}

