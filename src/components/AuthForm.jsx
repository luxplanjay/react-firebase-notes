import React, { Component } from 'react';
import styles from './AuthForm.css';

class AuthForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handleInputChange = evt => {
    const value = evt.target.value;
    const type = evt.target.type;

    this.setState({ [type]: value });
  };

  handleCreateUser = evt => {
    const { email, password } = this.state;
    evt.preventDefault();
    this.props.onCreateUser(email, password);
  };

  handleSignInUser = evt => {
    const { email, password } = this.state;
    evt.preventDefault();
    this.props.onSignIn(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <form className={styles.form}>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={this.handleInputChange}
          placeholder="Email"
          required
          autoFocus
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={this.handleInputChange}
          placeholder="Password"
          required
        />
        <div className={styles.actions}>
          <button className={styles.button} onClick={this.handleCreateUser}>
            Sign Up
          </button>
          OR
          <button className={styles.button} onClick={this.handleSignInUser}>
            Log In
          </button>
        </div>
      </form>
    );
  }
}

export default AuthForm;
