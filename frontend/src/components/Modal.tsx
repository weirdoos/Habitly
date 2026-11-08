import "./Modal.css";
function Modal(children: any) {
  return (
    <div>
      <div className="layer">
        <div className="modal">
          <div className="modalMain">
            <div className="modalHeader">
              <h1></h1>
              <button className="modalBtn">x</button>
            </div>

            <div className="modalContent">{children}</div>
          </div>

          <div className="modalFooter">
            <button className="modalConfirm" type="button"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
