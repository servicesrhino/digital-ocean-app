import React from 'react';
import './Modal.css';

const Modal = ({ active, setActive }) => {
  return (
    <div
      className={active ? 'modal__active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      ></div>
      Modal
    </div>
  );
};

export default Modal;
