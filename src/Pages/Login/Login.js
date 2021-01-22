import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './Login.css';

class Login extends Component {
  handleLoginSuccess = () => {
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