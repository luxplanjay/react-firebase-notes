import React from 'react';
import styles from './Note.css';

const Note = ({ text, onClick }) => (
  <div className={styles.note}>
    <p>{text}</p>
    <button className={styles.button} onClick={onClick}>
      &times;
    </button>
  </div>
);

export default Note;
