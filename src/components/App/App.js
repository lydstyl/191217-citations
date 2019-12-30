import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Home from '../Home/Home';
import Quotes from '../Quotes/Quotes';
import ChargesLists from '../ChargesLists/ChargesLists';
import FileUpload from '../FileUpload/FileUpload';
import ChargeList from '../ChargeList/ChargeList';
import ChargeList2 from '../ChargeList2/ChargeList2';

import { AuthProvider } from '../Auth/Auth'; // maybe to change
import { UserCtxProvider } from '../../reducers/useUser'; // with this one ?
import { ChargeCtxProvider } from '../../reducers/useCharge';

import './App.scss';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Menu />

        <UserCtxProvider>
          <ChargeCtxProvider>
            <div className='container'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
              <Route path='/ChargeList2' component={ChargeList2} />
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/quotes' component={Quotes} />
              <PrivateRoute
                exact
                path='/charges-lists'
                component={ChargesLists}
              />
              <PrivateRoute exact path='/upload-file' component={FileUpload} />
              <PrivateRoute path='/charge-list/' component={ChargeList} />
            </div>
          </ChargeCtxProvider>
        </UserCtxProvider>

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
