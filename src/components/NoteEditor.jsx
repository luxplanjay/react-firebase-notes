import React, { Component } from 'react';
import styles from './NoteEditor.css';

class NoteEditor extends Component {
  state = { inputVal: '' };

  handleInputChange = evt => {
    const val = evt.target.value;
    this.setState({ inputVal: val });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    this.props.onAddNote({ text: this.state.inputVal });
    this.setState({ inputVal: '' });
  };

  render() {
    const { inputVal } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleFormSubmit}>
        <input
          className={styles.input}
          type="text"
          onChange={this.handleInputChange}
          value={inputVal}
        />
        <button className={styles.button}>Add Note</button>
      </form>
    );
  }
}

export default NoteEditor;
