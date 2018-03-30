import React from 'react';
import AppNav from './AppNav';
import styles from './AppBar.css';

const AppBar = () => (
  <header className={styles.appbar}>
    <div className={styles.container}>
      <AppNav />
    </div>
  </header>
);

export default AppBar;
