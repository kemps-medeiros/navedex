import React, { useState } from 'react';
import Modal from 'react-modal';
import './modalCreate.css';
import api from '../../../services/Api';

const modalCreate = () => {
  const closeModalCreate = () => {};

  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        <div className="container__modalCreate">
          <div className="line1__modalCreate">
            <h1>Naver Criado</h1>
            <a className="close__modalCreate" onClick={closeModalCreate}></a>
          </div>
          <div className="text__modalCreate">Naver criado com sucesso!</div>
        </div>
      </Modal>
    </div>
  );
};

export default modalCreate;
