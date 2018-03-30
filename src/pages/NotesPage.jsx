import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotesList from '../containers/NotesList';
import NoteEditor from '../containers/NoteEditor';
import { createNotesDbObserver } from '../actions';

// TODO: remove inline styling
const ownStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '1200px',
  margin: '0 auto',
};

class NotesPage extends Component {
  componentWillMount() {
    this.props.onCreateNotesDbObserver();
  }

  render() {
    return (
      <div style={ownStyles}>
        <NoteEditor />
        <NotesList />
      </div>
    );
  }
}

const mdtp = dispatch => ({
  onCreateNotesDbObserver: () => dispatch(createNotesDbObserver()),
});

export default connect(null, mdtp)(NotesPage);
