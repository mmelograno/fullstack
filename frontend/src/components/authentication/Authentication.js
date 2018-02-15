import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './styles.css';

import AuthenticationContainer from '../../_containers/authenticationContainer';
import Login from './Login';
import Registration from './Registration';

class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      loginFormError: {
        email: '',
        password: '',
      },
      loginFormValid: false,
      userRegistration: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        firstName: '',
        lastName: '',
      },
      registrationFormError: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        firstName: '',
        lastName: '',
      },
      registrationFormValid: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeRegistration = this.onChangeRegistration.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentDidMount() {
    this.props.actions.signout();
  }

  signin(event) {
    event.preventDefault();
    this.props.actions.signin(this.state.user);
  }

  signup(event) {
    event.preventDefault();
    this.props.actions.signup(this.state.userRegistration);
  }

  validateFormLogin({ email, password }) {
    const isValid = email.length === 0 && password.length === 0;
    this.setState({
      loginFormValid: isValid,
    });
  }

  onChange(event) {
    const field = event.target.name;
    const value = event.target.value;

    const user = Object.assign({}, this.state.user);
    user[field] = value;

    const loginFormError = this.state.loginFormError;
    switch (field) {
      case 'email':
        loginFormError.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? '' : 'email is invalid';
        break;
      case 'password':
        loginFormError.password = value.length >= 6
          ? '': 'password is too short';
        break;
      default:
        break;
    }

    return this.setState({
      user,
      loginFormError,
    }, this.validateFormLogin(loginFormError));
  }

  validateFormRegistration({ email, password, passwordConfirmation,
    firstName, lastName, username }) {
    const isValid = email.length === 0 &&
      password.length === 0 &&
      passwordConfirmation.length === 0 &&
      firstName.length === 0 &&
      lastName.length === 0 &&
      username.length === 0;
    this.setState({
      registrationFormValid: isValid,
    });
  }

  onChangeRegistration(event) {
    const field = event.target.name;
    const value = event.target.value;

    const userRegistration = Object.assign({}, this.state.userRegistration);
    userRegistration[field] = event.target.value;

    const registrationFormError = this.state.registrationFormError;
    switch (field) {
      case 'email':
        registrationFormError.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? '' : 'email is invalid';
        break;
      case 'password':
        registrationFormError.password = value.length >= 6
          ? '' : 'password is too short';
        break;
      case 'passwordConfirmation':
        registrationFormError.passwordConfirmation =
          value === this.state.userRegistration.password
          ? '' : 'password does not match';
        break;
      case 'username':
      case 'firstName':
      case 'lastName':
        registrationFormError[field] = value.length >= 3
          ? '' : `${field} is too short`;
        break;
      default:
        break;
    }

    this.setState({
      userRegistration,
      registrationFormError,
    }, this.validateFormRegistration(registrationFormError));
  }

  render() {
    return (
      <div className="container">
        <h3 className="title-selected">Login / Registration</h3>
        <hr className="divider" />
        <div className="row">
          <div className="col-md-6">
            <Login
              user={this.state.user}
              loginFormError={this.state.loginFormError}
              isValid={this.state.loginFormValid}
              onChange={this.onChange}
              signin={this.signin}
              errors={this.props.errors.login || {}} />
          </div>
          <div className="col-md-6">
            <Registration
              userRegistration={this.state.userRegistration}
              registrationFormError={this.state.registrationFormError}
              isValid={this.state.registrationFormValid}
              onChange={this.onChangeRegistration}
              signup={this.signup}
              errors={this.props.errors.registration || {}} />
          </div>
        </div>
        <br />
        <hr className="divider" />
      </div>
    );
  }
}

Authentication.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default withRouter(AuthenticationContainer(Authentication));
