import React, { useCallback } from 'react';
import { withRouter } from 'react-router';

import app from '../../utils/firebase/base';

import './style.scss';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();

      const { email, password } = event.target.elements;

      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className='sign-up'>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <div className='field'>
          <label>Email</label>
          <input name='email' type='email' placeholder='Email' />
        </div>

        <div className='field'>
          <label>Password</label>
          <input
            autoComplete='true'
            name='password'
            type='password'
            placeholder='Password'
          />
        </div>

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
