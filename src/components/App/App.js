import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ChargesLists from '../ChargesLists/ChargesLists';
import ChargeList from '../ChargeList/ChargeList';
import MediumImage from '../MediumImage/MediumImage';

import { UserCtxProvider } from '../../reducers/useUser';
import { ChargeCtxProvider } from '../../reducers/useCharge';

import './App.scss';

export const App = () => {
  return (
    <Router>
      <UserCtxProvider>
        <Menu />

        <div className='container'>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <ChargeCtxProvider>
            <PrivateRoute exact path='/' component={ChargesLists} />
            <Route path='/charge-list' component={ChargeList} />
            <Route path='/charge' component={MediumImage} />
          </ChargeCtxProvider>
        </div>
      </UserCtxProvider>
      <footer>
        <div>
          Un commentaire ? Vous pouvez l'envoyer sur la vidéo de cette
          application ou en privé sur lydstyl@gmail.com
        </div>
      </footer>
    </Router>
  );
};

export default App;
