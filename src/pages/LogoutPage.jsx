import React, { Component } from 'react';
import withAuth from '../hoc/withAuth';
import { Redirect } from 'react-router-dom';

class LogoutPage extends Component {
  componentDidMount() {
    this.props.onSignOut();
  }

  render() {
    return !this.props.isAuthenticated && <Redirect to="/" />;
  }
}

export default withAuth(LogoutPage);
