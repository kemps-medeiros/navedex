import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modalNaver.css';
import { FaTrash, FaPen } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/Api';
import ModalDelete from '../modalDelete/ModalDelete';

const customStyles = {
  content: {
    top: '15%',
    left: '15%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    // marginBottom: '-50%',
    // transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
  },
};

Modal.setAppElement('#root');

const ModalNaver = ({ onClose, selectedNaver }) => {
  const [editUser, setEditUser] = useState(selectedNaver);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [isOpenModalNaver, setIsOpenModalNaver] = useState(true);
  const token = localStorage.getItem('useToken');
  const history = useHistory();

  useEffect(() => {
    console.log('alterou Estado');
  }, [isModalDeleteOpen]);

  useEffect(() => {
    console.log(selectedNaver);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    // console.log(event);
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

  // async function fetchData() {
  //   const getData = await api
  //     .get('navers', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       // setNavers(response.data);
  //       console.log(response.data);
  //     });
  // }

  async function deleteNaver(id) {
    try {
      console.log(id);
      await api.delete(`navers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onClose(null);
    } catch (err) {
      console.log(err);
      alert('Erro ao deletar o Naver, tente novamente');
    }
  }

  return (
    <div>
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
            <p className="p_modalNaver">{editUser.birthdate}</p>
            <p className="title_modalNaver">Tempo de Empresa</p>
            <p className="p_modalNaver">{editUser.admission_date}</p>
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
