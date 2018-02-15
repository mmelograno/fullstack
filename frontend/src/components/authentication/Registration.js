import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const errorClass = (error) => error.length === 0 ? '' : 'inner-addon right-addon has-error';

const Registration = (props) => {
  return (
    <div className="col-md-12 authentication">
      <br />
      <h6 className="authentication-title">
        <i className="fa fa-file-text-o authentication-logo" aria-hidden="true" />REGISTRATION
      </h6>
      <hr />
      {props.errors.message ?
        <div className="alert alert-danger" role="alert">
          <strong>{props.errors.message}</strong>
        </div>
        : null
      }
      <form>
        <div className={`form-group ${errorClass(props.registrationFormError.username)}`}>
          {props.registrationFormError.username.length === 0
            ? null : <i className="fa fa-times" />}
          <input
            name="username"
            type="text"
            className="form-control form-control-sm"
            placeholder="Username"
            value={props.userRegistration.username}
            onChange={props.onChange} />
          <span className="invalid">{props.registrationFormError.username}</span>
        </div>
        <div className={`form-group ${errorClass(props.registrationFormError.email)}`}>
          {props.registrationFormError.email.length === 0
            ? null : <i className="fa fa-times" />}
          <input
            name="email"
            type="email"
            className="form-control form-control-sm"
            placeholder="Email"
            value={props.userRegistration.email}
            onChange={props.onChange} />
          <span className="invalid">{props.registrationFormError.email}</span>
        </div>
        <div className={`form-group ${errorClass(props.registrationFormError.password)}`}>
          {props.registrationFormError.password.length === 0
            ? null : <i className="fa fa-times" />}
          <input
            name="password"
            type="password"
            className="form-control form-control-sm"
            placeholder="Password"
            value={props.userRegistration.password}
            onChange={props.onChange} />
          <span className="invalid">{props.registrationFormError.password}</span>
        </div>
        <div className={`form-group ${errorClass(props.registrationFormError.passwordConfirmation)}`}>
          {props.registrationFormError.passwordConfirmation.length === 0
            ? null : <i className="fa fa-times" />}
          <input
            name="passwordConfirmation"
            type="password"
            className="form-control form-control-sm"
            placeholder="Password Confirmation"
            value={props.userRegistration.passwordConfirmation}
            onChange={props.onChange} />
            <span className="invalid">{props.registrationFormError.passwordConfirmation}</span>
        </div>
        <div className={`form-group ${errorClass(props.registrationFormError.firstName)}`}>
          {props.registrationFormError.firstName.length === 0
            ? null : <i className="fa fa-times" />}
          <input
            name="firstName"
            type="text"
            className="form-control form-control-sm"
            placeholder="First Name"
            value={props.userRegistration.firstName}
            onChange={props.onChange} />
            <span className="invalid">{props.registrationFormError.firstName}</span>
        </div>
        <div className={`form-group ${errorClass(props.registrationFormError.lastName)}`}>
          {props.registrationFormError.lastName.length === 0
            ? null : <i className="fa fa-times" />}
          <input
            name="lastName"
            type="text"
            className="form-control form-control-sm"
            placeholder="Last Name"
            value={props.userRegistration.lastName}
            onChange={props.onChange} />
            <span className="invalid">{props.registrationFormError.lastName}</span>
        </div>
        <button
          type="submit"
          className="btn btn-secondary btn-sm float-sm-right"
          disabled={!props.isValid}
          onClick={props.signup}>
            SIGN UP
        </button>
      </form>
      <br />
      <br />
      <hr style={{ paddingBottom: '1em' }}/>
    </div>
  );
};

Registration.propTypes = {
  userRegistration: PropTypes.object.isRequired,
  registrationFormError: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Registration;
