
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ModalProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ModalProvider>,
)
