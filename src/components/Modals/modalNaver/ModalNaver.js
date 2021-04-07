import React, { useEffect } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
  },
};

Modal.setAppElement('#root');

const ModalNaver = ({ onClose }) => {
  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // });

  // const handleKeyDown = (event) => {
  //   console.log(event);
  //   if (event.key === 'Escape') {
  //     onClose(null);
  //   }
  // };

  const closeModal = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        <h1>Este é o Modal</h1>
        <a onClick={closeModal}> X</a>
      </Modal>
    </div>
  );
};

export default ModalNaver;
