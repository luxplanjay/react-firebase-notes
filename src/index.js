import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import App from './components/App';
import store, { history } from './store';
import { createAuthObserver } from './actions';
import './index.css';

store.dispatch(createAuthObserver());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route to="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
