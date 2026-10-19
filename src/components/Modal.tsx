import './Modal.css'

interface Modal {
    name:string,
    children: React.ReactNode,
    modalCardClass: string,
    closeModalCard: () => void,
    onClick: () => void
}

const Modal = ({name ,closeModalCard, modalCardClass, children, onClick}:Modal) => {
  return (
    <div className={modalCardClass}>
        <div className="layer">
            <div className="modal">
                <div className="modalMain">
                    <div className="modalHeader">
                        <h1>{name}</h1>
                        <button className='modalBtn' onClick={closeModalCard}>x</button>
                    </div>

                    <div className="modalContent">
                        {children}
                    </div>
                </div>
                

                <div className="modalFooter">
                    <button className='modalConfirm' type="button" onClick={onClick}>{name}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal