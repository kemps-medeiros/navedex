import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { FaChevronLeft } from 'react-icons/fa';
import './new.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import api from '../../services/Api';
import ModalCreate from '../../components/Modals/modalCreate/ModalCreate';
import schemaNewNaver from '../../schemaNewNaver';

const New = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const token = localStorage.getItem('useToken');

  const addNewNaver = (values, actions) => {
    api
      .post(
        'navers',
        {
          job_role: values.title,
          admission_date: values.companyTime,
          birthdate: values.age,
          project: values.projects,
          name: values.nameNaver,
          url: values.path,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setIsOpenModalCreate(true);
      })
      .catch((errors) => {
        console.log(errors);
        actions.resetForm();
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
            <h2> Adicionar Naver </h2>
          </div>

          <Formik
            validationSchema={schemaNewNaver}
            className="formik__new__naver"
            onSubmit={addNewNaver}
            initialValues={{
              nameNaver: '',
              age: '',
              projects: '',
              title: '',
              companyTime: '',
              path: '',
            }}
            render={({ values, errors, touched, isValid, setFieldValue }) => (
              <Form className="form__add">
                <div className="col">
                  <div className="fields">
                    <label>Nome</label>
                    <Field
                      type="text"
                      autoFocus={true}
                      name="nameNaver"
                      placeholder="Nome"
                      className="input__add"
                    />
                    <ErrorMessage name="nameNaver" />
                  </div>
                  <div className="fields">
                    <label>Data de Nascimento</label>
                    <Field
                      type="text"
                      name="age"
                      placeholder="Idade"
                      className="input__add"
                    />
                    <ErrorMessage name="age" />
                  </div>
                  <div className="fields">
                    <label>Projetos que participou</label>
                    <Field
                      type="text"
                      name="projects"
                      placeholder="Projetos que participou"
                      className="input__add"
                    />
                    <ErrorMessage name="projects" />
                  </div>
                </div>
                <div className="col">
                  <div className="fields">
                    <label>Cargo</label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Cargo"
                      className="input__add"
                    />
                    <ErrorMessage name="projects" />
                  </div>
                  <div className="fields">
                    <label>Data de Admissão</label>
                    <Field
                      type="text"
                      name="companyTime"
                      placeholder="Tempo de Empresa"
                      className="input__add"
                    />
                    <ErrorMessage name="companyTime" />
                  </div>
                  <div className="fields">
                    <label>URL da foto do Naver</label>
                    <Field
                      type="text"
                      name="path"
                      placeholder="URL da foto do Naver"
                      className="input__add"
                    />
                    <ErrorMessage name="path" />
                  </div>

                  <div className="btn__box">
                    <span></span>
                    <button className="btn__add" type="submit">
                      {' '}
                      Salvar{' '}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
      {isOpenModalCreate && <ModalCreate />}
    </div>
  );
};

export default New;
