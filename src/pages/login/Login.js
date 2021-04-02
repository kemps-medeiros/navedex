import React, { useContext } from 'react';
import './login.css';
import logo from '../../images/logoNave.svg';
import { Formik, Field, Form } from 'formik';
import api from '../../services/Api';
import { userLogin } from '../../services/Auth';
import StoreContext from '../../components/Store/Context';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  const login = (values, actions) => {
    api
      .post('users/login', {
        email: values.emaillogin,
        password: values.password,
      })
      .then((response) => {
        if (response.data.token) {
          setToken(response.data.token);
          userLogin(response.data.token);
          history.push('/home');
          actions.resetForm();
        }
      })
      .catch((errors) => {
        if (errors) {
          alert('Usuario ou senha inválidas');
        }
        actions.resetForm();
      });
  };

  return (
    <div className="container">
      <div className="login__box">
        <div className="logo">
          <img src={logo} alt="Nave Logo" />
          <h1>nave.rs</h1>
        </div>
        <div className="form">
          <Formik
            className="formik"
            onSubmit={login}
            initialValues={{
              emaillogin: '',
              password: '',
            }}
            render={({ values, errors, touched, isValid, setFieldValue }) => (
              <Form className="formik__form">
                <div className="email">
                  <label>E-mail</label>
                  <Field
                    type="email"
                    autoFocus={true}
                    className="input"
                    name="emaillogin"
                    placeholder="E-mail"
                  />
                </div>
                <div className="password">
                  <label>Senha</label>
                  <Field
                    type="password"
                    className="input"
                    name="password"
                    placeholder="Senha"
                  />
                </div>

                <button className="btn__login" type="submit">
                  {' '}
                  Entrar{' '}
                </button>
              </Form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
