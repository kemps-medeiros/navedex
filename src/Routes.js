import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import StoreProvider from './components/Store/Provider';
import StoreContext from './components/Store/Context';

import Login from './pages/login/Login';
import Home from './pages/home/Home';
import New from './pages/new/New';
import Edit from './pages/edit/Edit';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(StoreContext);

  return (
    <Route
      {...rest}
      render={() => (token ? <Component {...rest} /> : <Redirect to="/" />)}
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route path="/" exact component={Login} />;
        <PrivateRoute path="/home" exact component={Home} />;
        <PrivateRoute path="/new" exact component={New} />;
        <PrivateRoute path="/edit/:id" exact component={Edit} />;
      </Switch>
    </StoreProvider>
  </BrowserRouter>
);

export default Routes;
