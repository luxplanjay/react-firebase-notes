import { connect } from 'react-redux';
import NoteEditor from '../components/NoteEditor';
import { addNote } from '../actions';

const mDTP = dispatch => ({
  onAddNote: note => dispatch(addNote(note)),
});

export default connect(null, mDTP)(NoteEditor);
