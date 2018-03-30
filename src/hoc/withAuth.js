import { connect } from 'react-redux';
import { createAuthObserver, signOut, createUser, signIn } from '../actions';
import {
  getIsAuthenticated,
  getIsAuthenticating,
  getError,
} from '../selectors';

const mapStateToProps = state => ({
  error: getError(state),
  isAuthenticated: getIsAuthenticated(state),
  isAuthenticating: getIsAuthenticating(state),
});

const mapDispatchToProps = dispatch => ({
  onCreateAuthObserver: () => dispatch(createAuthObserver()),
  onCreateUser: (email, password) => dispatch(createUser(email, password)),
  onSignOut: () => dispatch(signOut()),
  onSignIn: (email, password) => dispatch(signIn(email, password)),
});

const withAuth = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component);

export default withAuth;
