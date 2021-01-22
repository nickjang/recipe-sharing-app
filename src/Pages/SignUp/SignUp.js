import React, { Component } from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import './SignUp.css';

class SignUp extends Component {  
  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {    
    return (
      <SignUpForm onSuccess={this.handleRegistrationSuccess} />
    );
  }
}

SignUp.defaultProps = {
  location: {},
  history: {
    push: () => { }
  }
}

export default SignUp;