import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const UserOptions = (props) => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle nav-title-top"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false">
        <i className="fa fa-user-circle" aria-hidden="true"/>
      </a>
      <div className="dropdown-menu nav-title-dropdown">
        <span className="user">{props.username}</span>
        <div className="dropdown-divider" />
        <a className="dropdown-item" href="/profile">
          <i className="fa fa-user icon" aria-hidden="true" />Profile
        </a>
        <div className="dropdown-divider" />
        <a className="dropdown-item" onClick={props.signout}>
          <i className="fa fa-sign-out icon" aria-hidden="true" />Sign Out
        </a>
      </div>
    </li>
  );
};

UserOptions.propTypes = {
  username: PropTypes.string.isRequired,
  signout: PropTypes.func.isRequired,
};

export default UserOptions;
