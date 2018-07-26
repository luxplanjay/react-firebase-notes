import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import withAuth from '../hoc/withAuth';
import AuthPage from '../pages/AuthPage';
import NotesPage from '../pages/NotesPage';
import LogoutPage from '../pages/LogoutPage';
import AppBar from './AppBar';

class App extends Component {
  // componentDidMount() {
  //   this.props.onCreateAuthObserver();
  // }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        <AppBar />
        <Switch>
          <Route exact path="/" component={AuthPage} />
          <PrivateRoute
            path="/logout"
            component={LogoutPage}
            isAuthenticated={isAuthenticated}
            redirectTo="/"
          />
          <PrivateRoute
            exact
            path="/notes"
            component={NotesPage}
            isAuthenticated={isAuthenticated}
            redirectTo="/"
          />
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);
