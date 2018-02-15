import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const errorClass = (error) => error.length === 0 ? '' : 'inner-addon right-addon has-error';

const Login = (props) => {
  return (
    <div className="col-md-12 authentication">
      <br />
      <h6 className="authentication-title">
        <i className="fa fa-sign-in authentication-logo" aria-hidden="true" />LOGIN
      </h6>
      <hr />
      {props.errors.message ?
        <div className="alert alert-danger" role="alert">
          <strong>{props.errors.message}</strong>
        </div>
        : null
      }
      <form>
        <div className={`form-group ${errorClass(props.loginFormError.email)}`}>
          {props.loginFormError.email.length === 0
            ? null : <i className="fa fa-times" />}
          <input
            type="email"
            name="email"
            className="form-control form-control-sm"
            placeholder="Email"
            value={props.user.email}
            onChange={props.onChange} />
          <span className="invalid">{props.loginFormError.email}</span>
        </div>
        <div className={`form-group ${errorClass(props.loginFormError.password)}`}>
          {props.loginFormError.password.length === 0
            ? null : <i className="fa fa-times" />}
          <input
            type="password"
            name="password"
            className="form-control form-control-sm"
            placeholder="Password"
            value={props.user.password}
            onChange={props.onChange} />
          <span className="invalid">{props.loginFormError.password}</span>
        </div>
        <button
          type="submit"
          className="btn btn-secondary btn-sm float-sm-right"
          disabled={!props.isValid}
          onClick={props.signin} >
            SIGN IN
        </button>
      </form>
      <br />
      <br />
      <hr style={{ paddingBottom: '1em' }}/>
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.object.isRequired,
  loginFormError: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Login;
