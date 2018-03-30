import React from 'react';
import styles from './Loader.css';

export default () => (
  <div className={styles.backdrop}>
    <div className={styles.loader} />
  </div>
);
