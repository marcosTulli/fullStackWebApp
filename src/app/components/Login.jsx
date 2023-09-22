import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const Login = ({ authenticateUser }) => {
  return (
    <div>
      <h2>Please Log in</h2>
      <form onSubmit={authenticateUser}>
        <input type="text" placeholder="username" name="username" defaultValue={'Dev'} />
        <input type="password" placeholder="password" name="password" defaultValue="" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target['username'].value;
    let password = e.target['password'].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
