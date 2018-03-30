import * as types from '../constants';
import { notesDbRef, auth } from '../firebase';

/**
 * FETCH NOTES ACTIONS
 */
const fetchNotesStart = () => ({
  type: types.FETCH_NOTES_START,
});

const fetchNotesSuccess = notes => ({
  type: types.FETCH_NOTES_SUCCESS,
  payload: { notes },
});

const fetchNotesFail = error => ({
  type: types.FETCH_NOTES_FAIL,
  payload: { error },
});

/**
 * ADD NOTE ACTIONS
 */
const addNoteStart = () => ({
  type: types.ADD_NOTE_START,
});

const addNoteSuccess = (key, note) => ({
  type: types.ADD_NOTE_SUCCESS,
  payload: { key, note },
});

const addNoteFail = error => ({
  type: types.ADD_NOTE_FAIL,
  payload: { error },
});

export const addNote = note => dispatch => {
  const currentUserId = auth.currentUser.uid;

  dispatch(addNoteStart());

  notesDbRef
    .child(currentUserId)
    .push(note)
    .catch(err => dispatch(addNoteFail(err)));
};

/**
 * DELETE NOTE ACTIONS
 */
const deleteNoteStart = () => ({
  type: types.DELETE_NOTE_START,
});

const deleteNoteSuccess = noteId => ({
  type: types.DELETE_NOTE_SUCCESS,
  payload: { noteId },
});

const deleteNoteFail = error => ({
  type: types.DELETE_NOTE_FAIL,
  payload: { error },
});

export const deleteNote = noteId => dispatch => {
  const currentUserId = auth.currentUser.uid;

  dispatch(deleteNoteStart());

  notesDbRef
    .child(`${currentUserId}/${noteId}`)
    .remove()
    .catch(error => dispatch(deleteNoteFail(error)));
};

/**
 * CREATE NOTES NODE DB OBSERVER ACTIONS
 */

/**
 * Fetching all notes once on initial page load
 *
 * @param {string} userId current authenticated user id
 * @param {function} dispatch redux store method
 */
const initOnceOnValueListener = (userId, dispatch) => {
  dispatch(fetchNotesStart());

  notesDbRef
    .child(userId)
    .once('value', snapshot => {
      const notes = snapshot.val() ? snapshot.val() : {};

      dispatch(fetchNotesSuccess(notes));
    })
    .catch(error => dispatch(fetchNotesFail(error)));
};

// FIXME: addNoteSuccess sometimes being fired after delete o.O
/**
 * Listen for child_added event and
 * dispatch an action to update state
 *
 * @param {string} userId current authenticated user id
 * @param {function} dispatch redux store method
 */
const initChildAddedListener = (userId, dispatch) => {
  notesDbRef
    .child(userId)
    .orderByKey()
    .limitToLast(1)
    .on('child_added', snapshot => {
      const note = snapshot.val();
      const key = snapshot.key;

      dispatch(addNoteSuccess(key, note));
    });
};

/**
 * Listen for child_removed event and
 * dispatch an action to update state
 *
 * @param {string} userId current authenticated user id
 * @param {function} dispatch redux store method
 */
const initChildRemovedListener = (userId, dispatch) => {
  notesDbRef.child(userId).on('child_removed', snapshot => {
    const key = snapshot.key;

    dispatch(deleteNoteSuccess(key));
  });
};

// FIXME: решить проблему с child_added при первом запросе
// приходит "лишний итем" и пока что просто из-за костыля
// работает ок, так как fetch_notes_success переписывает поверх
export const createNotesDbObserver = () => dispatch => {
  if (auth.currentUser) {
    const currentUserId = auth.currentUser.uid;

    initOnceOnValueListener(currentUserId, dispatch);
    initChildAddedListener(currentUserId, dispatch);
    initChildRemovedListener(currentUserId, dispatch);
  }
};

/**
 * TODO: если нужно следить за изменениями узла
 *
 * notesDbRef.child(currentUserId).on('child_changed', snapshot => {...});
 *
 * используется метод ref.update({...})
 * где ref это ссылка на узел который необходимо обновить
 */
