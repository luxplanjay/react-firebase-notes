import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
            pathname: redirectTo,
            state: { from: props.location }
          }} />
    }
  />
);

export default PrivateRoute;
