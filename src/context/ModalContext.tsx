import { createContext, useContext, useState, type ReactNode } from 'react'


interface ModalContextValue {
  modalCardClass: string,
  setModalCardClass: () => void,
  isModalCard: boolean,
  setIsModalCard: () => void,
  openModalCard: () => void,
  closeModalCard: () => void
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined)

export const ModalProvider = ({children}: {children: ReactNode}) => {

    const [modalCardClass, setModalCardClass] = useState<string>('hidden')
    const [isModalCard, setIsModalCard] = useState<boolean>(false)

    function openModalCard () {
        if (isModalCard === false) {
            setModalCardClass('')
            setIsModalCard(true)
        } 
    }

    function closeModalCard () {
        if (isModalCard === true) {
            setModalCardClass('hidden')
            setIsModalCard(false)
        }
    }
    

  return (
    <ModalContext.Provider value={{ closeModalCard, openModalCard, modalCardClass }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
    const ctx = useContext(ModalContext)
    if (!ctx) throw new Error('useUser должен быть внутри UserProvider');
    return ctx
}

