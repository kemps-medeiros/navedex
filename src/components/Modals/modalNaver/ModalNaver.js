import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modalNaver.css';
import { FaTrash, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ModalDelete from '../modalDelete/ModalDelete';

const customStyles = {
  content: {
    top: '15%',
    left: '15%',
    right: 'auto',
    bottom: 'auto',
    width: '1200px',
    height: '60%',
  },
};

Modal.setAppElement('#root');

const ModalNaver = ({ onClose, selectedNaver }) => {
  const [editUser, setEditUser] = useState(selectedNaver);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isOpenModalNaver, setIsOpenModalNaver] = useState(true);

  const token = localStorage.getItem('useToken');

  useEffect(() => {
    console.log(selectedNaver);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  function getAge(date) {
    if (date) {
      const birthDate = new Date(date);
      let yearBorn = birthDate.getFullYear();
      const currentDate = new Date();
      let yearNow = currentDate.getFullYear();
      let age = yearNow - yearBorn;

      return age;
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const closeModal = () => {
    onClose(null);
  };

  async function handleDeleteModal() {
    setIsModalDeleteOpen(true);
  }

  function getJobTime(date) {
    if (date) {
      const admissionDate = new Date(date);
      let yearAdmission = admissionDate.getFullYear();
      const currentDate = new Date();
      let yearNow = currentDate.getFullYear();
      let jobTime = yearNow - yearAdmission;

      return jobTime;
    }
  }

  return (
    <div className="modalNaver__">
      <Modal isOpen={isOpenModalNaver} style={customStyles}>
        <div className="container__modal_naver">
          <div className="col1_modal">
            <img
              src={`/images/avatars/${editUser.url}`}
              alt={editUser.name}
              className="img_modal"
            />
          </div>
          <div className="col2_modal">
            <div className="line1_modalNaver">
              <h1 className="h1__modalNaver">{editUser.name}</h1>

              <a onClick={closeModal} className="btn_close_modalNaver">
                {' '}
                X
              </a>
            </div>
            <p className="jobRole">{editUser.job_role}</p>
            <p className="title_modalNaver">Idade</p>
            <p className="p_modalNaver">{getAge(editUser.birthdate)} Anos</p>
            <p className="title_modalNaver">Tempo de Empresa</p>
            <p className="p_modalNaver">
              {getJobTime(editUser.admission_date)} Anos
            </p>
            <p className="title_modalNaver">Projetos que participou</p>
            <p className="p_modalNaver">{editUser.project}</p>
            <div className="icons__modalNaver">
              <a
                className="icon_modalNaver"
                // onClick={() => deleteNaver(editUser.id)}
                onClick={handleDeleteModal}
              >
                <FaTrash id={editUser.id} />
              </a>
              <Link to={`edit/${editUser.id}`} className="icon_modalNaver">
                <FaPen />
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      {isModalDeleteOpen && <ModalDelete id={editUser.id} />}
    </div>
  );
};

export default ModalNaver;
