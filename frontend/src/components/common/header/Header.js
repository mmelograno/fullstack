import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import UserOptions from './UserOptions';

const Header = (props) => {
  return (
    <div className="header">
      <div className="container-full">
        <div className="container">
          <ul className="nav justify-content-end">
            {props.isLoggedIn ?
              <UserOptions username={props.loggedUser.username} signout={props.signout}/>
              :
              <li className="nav-item">
                <a className="nav-link nav-title-top" href="/authentication">LOGIN - SIGNUP</a>
              </li>
            }
            <li className="nav-item">
              <a className="nav-link nav-title-top" href="/courses">
                <i className="fa fa-search icon" aria-hidden="true" />SEARCH
              </a>
            </li>
          </ul>
          <div className="title-header"><span>REACT APP</span></div>
          <div>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link nav-title-header" href="/">NEWS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-title-header" href="/courses">COURSES</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-title-header" href="/contact">CONTACT</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired,
};

export default Header;
