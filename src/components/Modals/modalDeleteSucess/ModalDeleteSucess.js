import React, { useState } from 'react';
import Modal from 'react-modal';
import './modalDeleteSucess.css';
import { useHistory } from 'react-router-dom';

const customStyles = {
  content: {
    top: '35%',
    left: '35%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    // marginBottom: '-50%',
    // transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '15%',
  },
};

Modal.setAppElement('#root');

const ModalDeleteSucess = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const history = useHistory();
  const closeModalCreate = () => {
    history.push('/home');
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        className="modal_default"
      >
        <div className="container__modalCreate">
          <div className="line1__modalCreate">
            <h1>Naver Excluído</h1>
            <a className="close__modalCreate" onClick={closeModalCreate}>
              X
            </a>
          </div>
          <div className="text__modalCreate">Naver excluído com sucesso!</div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDeleteSucess;
