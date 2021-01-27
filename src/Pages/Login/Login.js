import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import UserService from '../../services/user-service';
import './Login.css';

class Login extends Component {
  handleLoginSuccess = (userId) => {
    UserService.saveUserId(userId);
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
    window.location.reload();
  }

  render() {
    return (
      <LoginForm onSuccess={this.handleLoginSuccess} />
    );
  }
}

Login.defaultProps = {
  location: {},
  history: {
    push: () => { }
  }
}

export default Login;