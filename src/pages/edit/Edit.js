import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { FaChevronLeft } from 'react-icons/fa';
import './new.css';
import api from '../../services/Api';

const Edit = () => {
  // const [id, setId] = useState({});
  const [naverData, setNaverData] = useState({});
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [url, setUrl] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const objectId = useParams();
  let id = objectId.id;
  const token = localStorage.getItem('useToken');
  const history = useHistory();

  async function getNaverData() {
    try {
      id = objectId.id;
      await api
        .get(`navers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response) {
            setNaverData(response.data);
            setName(response.data.name);
            setProject(response.data.project);
            setJobRole(response.data.job_role);
            setBirthdate(response.data.birthdate);
            setUrl(response.data.url);
            setAdmissionDate(response.data.admission_date);
            console.log(name);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(id);
    if (id) {
      getNaverData();
    }
  }, [id]);

  const editNaver = (event) => {
    event.preventDefault();
    let id = objectId.id;
    console.log(id);
    api
      .put(
        `navers/${id}`,
        {
          job_role: jobRole,
          admission_date: admissionDate,
          birthdate: birthdate,
          project: project,
          name: name,
          url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);

        history.push('/home');
      })
      .catch((errors) => {
        console.log(errors);
        // actions.resetForm();
      });
  };

  return (
    <div>
      <Navbar />
      <div className="new__container">
        <div className="form__box">
          <div className="title__new_naver">
            <Link to="/home">
              <FaChevronLeft />
            </Link>
            <h2> Editar Naver </h2>
          </div>

          <form className="form__add" onSubmit={editNaver}>
            <div className="col">
              <div className="fields">
                <label>Nome</label>
                <input
                  type="text"
                  autoFocus={true}
                  id="nameNaver"
                  name="nameNaver"
                  placeholder="Nome"
                  className="input__add"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="fields">
                <label>Data de Nascimento</label>
                <input
                  type="text"
                  name="age"
                  placeholder="Idade"
                  className="input__add"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className="fields">
                <label>Projetos que participou</label>
                <input
                  type="text"
                  name="projects"
                  placeholder="Projetos que participou"
                  className="input__add"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="fields">
                <label>Cargo</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Cargo"
                  className="input__add"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>
              <div className="fields">
                <label>Data de Admissão</label>
                <input
                  type="text"
                  name="companyTime"
                  placeholder="Tempo de Empresa"
                  className="input__add"
                  value={admissionDate}
                  onChange={(e) => setAdmissionDate(e.target.value)}
                />
              </div>
              <div className="fields">
                <label>URL da foto do Naver</label>
                <input
                  type="text"
                  name="path"
                  placeholder="URL da foto do Naver"
                  className="input__add"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="btn__box">
                <span></span>
                <button className="btn__add" type="submit">
                  {' '}
                  Salvar{' '}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Edit;
