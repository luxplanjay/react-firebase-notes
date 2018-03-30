import * as types from '../constants';
import { auth, usersDbRef } from '../firebase';

/**
 * CREATE USER ACTIONS
 */
const createUserStart = () => ({
  type: types.CREATE_USER_START,
});

const createUserSuccess = () => ({
  type: types.CREATE_USER_SUCCESS,
});

const createUserFail = error => ({
  type: types.CREATE_USER_FAIL,
  payload: { error },
});

export const createUser = (email, password) => dispatch => {
  dispatch(createUserStart());

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      const currentUser = {
        id: user.uid,
        email: user.email,
      };

      usersDbRef
        .child(currentUser.id)
        .set(currentUser);

      dispatch(createUserSuccess());
    })
    .catch(error => dispatch(createUserFail(error)));
};

/**
 * SIGN IN ACTIONS
 */
const signInStart = () => ({
  type: types.SIGN_IN_START,
});

const signInSuccess = user => ({
  type: types.SIGN_IN_SUCCESS,
  payload: { user },
});

const signInFail = error => ({
  type: types.SIGN_IN_FAIL,
  payload: { error },
});

export const signIn = (email, password) => dispatch => {
  dispatch(signInStart());

  auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => dispatch(signInFail(error)));
};

// SIGN OUT ACTIONS
const signOutStart = () => ({
  type: types.SIGN_OUT_START,
});

const signOutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS,
});

const signOutFail = error => ({
  type: types.SIGN_OUT_FAIL,
  payload: { error },
});

export const signOut = () => dispatch => {
  dispatch(signOutStart());

  auth.signOut().catch(error => dispatch(signOutFail(error)));
};


/**
 * CREATE AUTH OBSERVER ACTIONS
 */
export const createAuthObserver = () => (dispatch, getState) =>
  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(
        signInSuccess({
          id: user.uid,
          email: user.email,
        }),
      );
    } else {
      dispatch(signOutSuccess());
    }
  });
