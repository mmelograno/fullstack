import * as types from '../_actions/actionTypes';

const getUser = () => (localStorage.getItem('user') ?
    {
      loggedUser: JSON.parse(localStorage.getItem('user')),
      isLoggedIn: true,
      errors: {},
    }
    :
    {
      loggedUser: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
      },
      isLoggedIn: false,
      errors: {},
    });

export default function authenticationReducer(state = getUser(), action) {
  switch (action.type) {
    case types.USER_SIGNUP_SUCCESS:
    case types.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loggedUser: action.user,
        isLoggedIn: true,
        errors: {},
        user: {
          email: '',
          password: '',
        },
        loginFormError: {
          email: '',
          password: '',
        },
        loginFormValid: false,
      };

    case types.USER_SIGNOUT_SUCCESS: return {
      ...state,
      loggedUser: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
      },
      isLoggedIn: false,
      errors: {},
    };

    case types.AJAX_CALL_ERROR: return {
      ...state,
      loggedUser: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
      },
      isLoggedIn: false,
      errors: {
        ...state.errors,
        ...action.payload,
      },
    };

    default:
      return state;
  }
}
