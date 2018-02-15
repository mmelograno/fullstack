import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuthenticationContainer from '../../_containers/authenticationContainer';
import Header from './header/Header';
import Footer from './footer/Footer';

const HeaderContainer = AuthenticationContainer(Header);

class Layout extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.signout = this.signout.bind(this);
  }

  signout() {
    this.props.actions.signout();
    this.setState({});
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="App">
        <HeaderContainer
          signout={this.signout}
        />
        <br />
        { this.props.children }
        <Footer />
    </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.array,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default AuthenticationContainer(withRouter(Layout));
