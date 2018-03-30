import React from 'react';
import Note from './Note';
import styles from './NotesList.css';

const NotesList = ({ notes, onDeleteNote }) => (
  <ul className={styles.list}>
    {notes.map(note => (
      <li className={styles.item} key={note.id}>
        <Note onClick={() => onDeleteNote(note.id)} {...note} />
      </li>
    ))}
  </ul>
);

export default NotesList;
