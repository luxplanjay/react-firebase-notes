import { combineReducers } from 'redux';
import * as types from '../constants';

function userReducer(state = { id: null, email: null }, { type, payload }) {
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        id: payload.user.id,
        email: payload.user.email,
      };

    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        id: null,
        email: null,
      };

    default:
      return state;
  }
}

function isAuthenticatedReducer(state = false, { type }) {
  switch (type) {
    case types.CREATE_USER_SUCCESS:
    case types.SIGN_IN_SUCCESS:
      return true;

    case types.CREATE_USER_START:
    case types.SIGN_IN_START:
    case types.SIGN_OUT_SUCCESS:
      return false;

    default:
      return state;
  }
}

function isAuthenticatingReducer(state = false, { type }) {
  switch (type) {
    case types.CREATE_USER_SUCCESS:
    case types.CREATE_USER_FAIL:
    case types.SIGN_IN_SUCCESS:
    case types.SIGN_IN_FAIL:
      return false;

    case types.CREATE_USER_START:
    case types.SIGN_IN_START:
      return true;

    default:
      return state;
  }
}

function errorReducer(state = null, { type, payload }) {
  switch (type) {
    case types.CREATE_USER_FAIL:
    case types.SIGN_IN_FAIL:
    case types.SIGN_OUT_FAIL:
      return payload.error;

    case types.CREATE_USER_START:
    case types.SIGN_IN_START:
    case types.SIGN_OUT_START:
    case types.CREATE_USER_SUCCESS:
    case types.SIGN_IN_SUCCESS:
    case types.SIGN_OUT_SUCCESS:
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  user: userReducer,
  isAuthenticated: isAuthenticatedReducer,
  isAuthenticating: isAuthenticatingReducer,
  error: errorReducer,
});
