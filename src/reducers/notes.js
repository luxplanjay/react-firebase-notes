import { combineReducers } from 'redux';
import * as types from '../constants';

function allIdsReducer(state = [], { type, payload }) {
  switch (type) {
    case types.FETCH_NOTES_SUCCESS:
      return payload.notes ? Object.keys(payload.notes) : [];

    case types.ADD_NOTE_SUCCESS:
      return [...state, payload.key];

    case types.DELETE_NOTE_SUCCESS:
      return state.filter(noteId => noteId !== payload.noteId);

    default:
      return state;
  }
}

function byIdReducer(state = {}, { type, payload }) {
  switch (type) {
    case types.FETCH_NOTES_SUCCESS:
      return payload.notes;

    case types.ADD_NOTE_SUCCESS:
      return {
        ...state,
        [payload.key]: payload.note,
      };

    case types.DELETE_NOTE_SUCCESS:
      const { [payload.noteId]: _, ...rest } = state;
      return rest;

    default:
      return state;
  }
}

function isLoadingReducer(state = false, { type }) {
  switch (type) {
    case types.FETCH_NOTES_START:
    case types.ADD_NOTE_START:
    case types.DELETE_NOTE_START:
      return true;

    case types.FETCH_NOTES_FAIL:
    case types.ADD_NOTE_FAIL:
    case types.DELETE_NOTE_FAIL:
    case types.FETCH_NOTES_SUCCESS:
    case types.ADD_NOTE_SUCCESS:
    case types.DELETE_NOTE_SUCCESS:
      return false;

    default:
      return state;
  }
}

function errorReducer(state = null, { type, payload }) {
  switch (type) {
    case types.FETCH_NOTES_FAIL:
    case types.ADD_NOTE_FAIL:
    case types.DELETE_NOTE_FAIL:
      return payload.error;

    case types.FETCH_NOTES_START:
    case types.ADD_NOTE_START:
    case types.DELETE_NOTE_START:
    case types.FETCH_NOTES_SUCCESS:
    case types.ADD_NOTE_SUCCESS:
    case types.DELETE_NOTE_SUCCESS:
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  allIds: allIdsReducer,
  byId: byIdReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
});
