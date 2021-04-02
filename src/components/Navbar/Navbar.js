import React, { useContext } from 'react';
import StoreContext from '../../components/Store/Context';
import './navbar.css';
import logo from '../../images/logoNave.svg';

const Navbar = () => {
  const { setToken } = useContext(StoreContext);

  const logout = () => {
    setToken(null);
  };

  return (
    <div className="container__nav">
      <div className="row">
        <div className="logo">
          <img src={logo} alt="Nave Logo" />
          <h2>nave.rs</h2>
        </div>
        <div className="logout">
          <a href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
