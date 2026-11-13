import type { Dispatch, SetStateAction } from "react";
import "./Modal.css";
import type Habits from "../pages/Habits";

type ModalProps = {
  name: string;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onClick: SetStateAction<Habits[]>;
  children: React.ReactNode;
};

function Modal({ name, isOpened, setIsOpened, children, onClick }: ModalProps) {
  return (
    <div className={isOpened === true ? "" : "hidden"}>
      <div className="layer">
        <div className="modal">
          <div className="modalMain">
            <div className="modalHeader">
              <h1>{name}</h1>
              <button
                className="modalBtn"
                onClick={() => setIsOpened((prev: boolean) => !prev)}
              >
                x
              </button>
            </div>

            <div className="modalContent">{children}</div>
          </div>

          <div className="modalFooter">
            <button className="modalConfirm" type="button" onClick={onClick}>
              {name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
