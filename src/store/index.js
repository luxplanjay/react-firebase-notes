import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

export const history = createHistory();

const middleware = [thunk, routerMiddleware(history)];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(reducers, {}, enhancer);

export default store;
