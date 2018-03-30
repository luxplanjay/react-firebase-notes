import React, { Fragment } from 'react';
import { compose } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './AppNav.css';
import withAuth from '../hoc/withAuth';

const PublicLinks = () => (
  <Fragment>
    <li>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.active}>
        login
      </NavLink>
    </li>
  </Fragment>
);

const PrivateLinks = () => (
  <Fragment>
    <li>
      <NavLink
        to="/logout"
        className={styles.link}
        activeClassName={styles.active}>
        logout
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/notes"
        className={styles.link}
        activeClassName={styles.active}>
        notes
      </NavLink>
    </li>
  </Fragment>
);

const AppNav = ({ isAuthenticated }) => (
  <ul className={styles.list}>
    {isAuthenticated ? <PrivateLinks /> : <PublicLinks />}
  </ul>
);

export default compose(withRouter, withAuth)(AppNav);
