import * as types from './actionTypes';
import axios from 'axios';
import { ajaxCallError } from './ajaxStatusActions';
import history from '../history';

function loginUserSuccess(user) {
  return {
    type: types.USER_SIGNIN_SUCCESS,
    user,
  };
}

export function signin(user) {
  return axios.post('http://localhost:3000/authenticate', user)
    .then(response => {
      const userResponse = Object.assign({}, response.data.user, {
        token: response.data.token
      });
      localStorage.setItem('user', JSON.stringify(userResponse));
      this.dispatch(loginUserSuccess(userResponse));
      history.push('/');
    })
    .catch(err => this.dispatch(ajaxCallError(err.response.data, 'login')));
}

function logoutUserSuccess() {
  return {
    type: types.USER_SIGNOUT_SUCCESS,
  };
}

export function signout() {
  localStorage.removeItem('user');
  return this.dispatch(logoutUserSuccess());
}

function signupUserSuccess(user) {
  return {
    type: types.USER_SIGNUP_SUCCESS,
    user,
  };
}

export function signup(user) {
  const userRegistration = Object.assign({}, user);
  delete userRegistration.passwordConfirmation;
  userRegistration.country = 'AR';
  return axios.post('http://localhost:3000/signup', userRegistration)
    .then(response => {
      const userResponse = Object.assign({}, response.data.user, {
        token: response.data.token
      });
      localStorage.setItem('user', JSON.stringify(userResponse));
      this.dispatch(signupUserSuccess(user));
      history.push('/');
    })
    .catch(err => this.dispatch(ajaxCallError(err.response.data, 'registration')));
}
