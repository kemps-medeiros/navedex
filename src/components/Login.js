import React from 'react';
import './login.css';
import logo from '../images/logoNave.svg';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const Login = () => {
  const login = () => {
    console.log('Kemps');
  };

  return (
    <div className="container">
      <div className="login__box">
        <div className="logo">
          <img src={logo} alt="Nave Logo" className="login-form-header-img" />
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
