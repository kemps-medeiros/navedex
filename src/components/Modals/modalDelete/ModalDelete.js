import React, { useState } from 'react';
import Modal from 'react-modal';
import './modalDelete.css';
import api from '../../../services/Api';
import { useHistory } from 'react-router-dom';
import ModalDeleteSucess from '../modalDeleteSucess/ModalDeleteSucess';

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
    height: '20%',
  },
};

Modal.setAppElement('#root');

const ModalDelete = ({ id }) => {
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isOpenModalDeleteSucess, setIsOpenModalDeleteSucess] = useState(false);
  const [isId, setIsId] = useState(id);
  const history = useHistory();
  const token = localStorage.getItem('useToken');

  const closeModal = () => {
    // console.log(isId);
    setIsOpenModal(false);
  };

  async function deleteNaver() {
    try {
      console.log(isId);
      await api.delete(`navers/${isId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsOpenModal(false);
      setIsOpenModalDeleteSucess(true);
      history.push('/home');
    } catch (err) {
      console.log(err);
      alert('Erro ao deletar o Naver, tente novamente');
    }
  }

  return (
    <div className="modal_default">
      <Modal isOpen={isOpenModal} style={customStyles}>
        <div className="container__modalDelete">
          <div className="title__modalDelete">
            <h1>Excluir Naver</h1>
          </div>
          <div className="question__modalDelete">
            <p>Tem certeza que deseja excluir este Naver?</p>
          </div>
          <div className="btns__modalDelete">
            <a className="btn_cancel" onClick={closeModal}>
              Cancelar
            </a>
            <a className="btn_delete" onClick={deleteNaver}>
              Excluir
            </a>
          </div>
        </div>
      </Modal>
      {isOpenModalDeleteSucess && <ModalDeleteSucess />}
    </div>
  );
};

export default ModalDelete;
