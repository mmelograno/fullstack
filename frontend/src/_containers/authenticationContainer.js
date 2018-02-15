
import { connect } from 'react-redux';

import { signin, signout, signup } from '../_actions/authenticationActions';

function mapStateToProps(state) {
  return {
    loggedUser: state.authentication.loggedUser,
    isLoggedIn: state.authentication.isLoggedIn,
    errors: state.authentication.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      signin: signin.bind({ dispatch }),
      signout: signout.bind({ dispatch }),
      signup: signup.bind({ dispatch }),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
