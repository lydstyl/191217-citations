import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Quotes from '../Quotes/Quotes';
import ChargeList from '../ChargeList/ChargeList';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Menu from '../Menu/Menu';

import { AuthProvider } from '../Auth/Auth';

import './App.scss';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Menu />

        <div className='container'>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/quotes' component={Quotes} />
          <PrivateRoute exact path='/test' component={ChargeList} />
        </div>

        <footer>
          <div>
            Un commentaire ? Vous pouvez l'envoyer sur lydstyl@gmail.com
          </div>
        </footer>
      </Router>
    </AuthProvider>
  );
};

export default App;
