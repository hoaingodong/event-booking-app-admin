import React, { useEffect } from "react"
import "./Modal.css"

const Modal = ({onRequestClose}) => {

    useEffect(() => {
        function onKeyDown(event) {
			if (event.keyCode === 27) {
				onRequestClose();
			}
		}
    });

    return (
        <div className="modal__backdrop">
            <div className="modal__container">
                <button onClick={onRequestClose}>Close</button>
                <p>Modal</p>
            </div>
        </div>
    )
};

export default Modal