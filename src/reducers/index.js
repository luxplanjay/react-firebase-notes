import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import notesReducer from './notes';
import authReducer from './auth';

const rootReducer = combineReducers({
  notes: notesReducer,
  auth: authReducer,
  routing: routerReducer,
});

export default rootReducer;
