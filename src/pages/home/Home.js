import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './home.css';
import api from '../../services/Api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [navers, setNavers] = useState([]);

  const token = localStorage.getItem('useToken');

  useEffect(async () => {
    await api
      .get('navers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNavers(response.data);
        console.log(response.data);
      });
  }, [token]);

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
          {navers.map((naver) => {
            return (
              <div className="card">
                <div>
                  <img
                    src={`/images/avatars/${naver.url}`}
                    alt={naver.name}
                    className="home-naver-profile-li-a-img"
                  />
                </div>
                <li>
                  <ul>{naver.name}</ul>
                  <ul>{naver.job_role}</ul>
                </li>
                <div className="handles">
                  <p>Trash</p>
                  <p>Edit</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
