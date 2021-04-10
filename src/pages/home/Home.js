import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './home.css';
import api from '../../services/Api';
import { Link } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';
import ModalNaver from '../../components/Modals/modalNaver/ModalNaver';
import ModalDelete from '../../components/Modals/modalDelete/ModalDelete';

const Home = () => {
  const [navers, setNavers] = useState([]);
  const [selectedNaver, setSelectedNaver] = useState([]);
  const [idNaver, setIdNaver] = useState('');
  const [isModalNaverOpen, setIsModalNaverOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const token = localStorage.getItem('useToken');

  async function fetchData() {
    const getData = await api
      .get('navers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNavers(response.data);
        console.log(response.data);
      });
  }

  useEffect(() => {
    fetchData();
  }, [token, isModalDeleteOpen]);

  async function deleteNaver(id) {
    try {
      // console.log(id);
      await api.delete(`navers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchData();

      // setNavers(navers.filter((naver) => naver.id !== id));
    } catch (err) {
      console.log(err);
      alert('Erro ao deletar o Naver, tente novamente');
    }
  }

  async function handleImg(id) {
    try {
      console.log(id);
      await api
        .get(`navers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSelectedNaver(response.data);
        });

      fetchData();
      setIsModalNaverOpen(true);
    } catch (err) {
      console.log(err);
      alert('Erro ao carregar o Naver, tente novamente');
    }
  }

  const handleClose = () => {
    setIsModalNaverOpen(false);
    fetchData();
  };

  const modalDeleteOpen = (id) => {
    setIdNaver(id);
    setIsModalDeleteOpen(true);
    fetchData();
  };

  return (
    <div>
      <Navbar />
      <section className="home__container">
        <div className="row__navers">
          <h1>Navers</h1>
          <Link className="newNaver" to="/new">
            Adicionar Naver
          </Link>
        </div>
        <div className="navers">
          <div className="row__cards">
            {navers.map(({ id, url, name, job_role }) => {
              // setId(id);
              return (
                <div key={id} className="card" id={id}>
                  <img
                    src={`/images/avatars/${url}`}
                    alt={name}
                    className="avatar"
                    onClick={() => handleImg(id)}
                  />

                  <div className="navers__data">
                    <h3 onClick={() => handleImg(id)}>{name}</h3>
                    <h4>{job_role}</h4>
                  </div>
                  <div className="handles">
                    {/* <a className="icons" onClick={() => deleteNaver(id)}> */}
                    <a className="icons" onClick={() => modalDeleteOpen(id)}>
                      <FaTrash id={id} />
                    </a>
                    <Link to={`edit/${id}`} className="icons">
                      <FaPen />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {isModalNaverOpen && (
        <ModalNaver onClose={handleClose} selectedNaver={selectedNaver} />
      )}
      {isModalDeleteOpen && <ModalDelete id={idNaver} />}
    </div>
  );
};

export default Home;
