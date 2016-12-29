import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE
} from './ActionTypes';

/*============================================================================
    authentication
==============================================================================*/

/* LOGIN */
export function loginRequest(username, password) {
    return (dispatch) => {
      // Inform Login API is starting
      dispatch(login());

      // API REQUEST
      return axios.post('/api/account/signin', { username, password})
      .then((response) => {
        // SUCCEED
        dispatch(loginSuccess(username));
      }).catch((error) => {
        // FAILED
        dispatch(loginFailure());
      });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

// REGISTER

export function registerRequest(username, password) {
  return (dispatch) => {

  };
}

export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS,
    error
  };
}
