import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import withAuth from '../hoc/withAuth';
import Loader from '../components/Loader';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '80px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// TODO: refactor modal login, perhaps a withModal HOC or render prop?
class AuthPage extends Component {
  constructor(props) {
    super(props);

    Modal.setAppElement('#root');

    this.state = {
      modalIsOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ modalIsOpen: true });
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { error, isAuthenticated, isAuthenticating } = this.props;

    return (
      <div>
        {isAuthenticated
          ? <Redirect to="/notes" />
          : isAuthenticating ? <Loader /> : <AuthForm {...this.props} />
        }

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal">
          <div>{error ? error.message : ''}</div>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default withAuth(AuthPage);
