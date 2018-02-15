import React from 'react';

import './styles.css';

class Footer extends React.Component {
    render() {
        return (
          <div className="footer">
            <div className="container-full">
              <div className="container">
                <div className="title">
                  REACT APP
                </div>
                <div>
                  <ul className="nav justify-content-center title-fonts">
                    <li className="nav-item">
                      <a className="nav-link nav-title-footer" href="/about">About</a>
                    </li>
                    {" | "}
                    <li className="nav-item">
                      <a className="nav-link nav-title-footer" href="/legal">Legal</a>
                    </li>
                    {" | "}
                    <li className="nav-item">
                      <a className="nav-link nav-title-footer" href="/contact">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Footer;
