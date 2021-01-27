import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AccountInput from '../AccountInput/AccountInput';
import AuthApiService from '../../services/auth-api-service'
import './LoginForm.css';

class LoginForm extends Component {
  state = {
    email: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false
    },
    loading: false,
    error: null
  }

  emailRef = React.createRef();

  updateEmail = (email) => {
    this.setState({ email: { value: email, touched: true } });
  }

  updatePassword = (password) => {
    this.setState({ password: { value: password, touched: true } });
  }

  validateEmail = () => {
    const email = this.state.email.value.trim();
    if (!email) return 'Email cannot be empty.';
    if (!email.includes('@')) return 'Email must include \'@\'.';
    if (!email.split('@')[1].includes('.')) return 'Email must include a \'.\'.';
    if (email.length < 5) return 'Please enter a valid email.';
    return;
  }

  validatePassword = () => {
    const password = this.state.password.value.trim();
    if (!password) return 'Password cannot be empty.';
    return;
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ error: '', loading: true })
    AuthApiService.postLogin({
      email: this.state.email.value,
      password: this.state.password.value,
    })
      .then(({ id }) => {
        if (id == null) 
          return this.setState({error: 'Did not get back user ID'});
        this.setState(
          {
            email: {
              value: '',
              touched: false
            },
            password: {
              value: '',
              touched: false
            },
            loading: false
          },
          () => this.props.onSuccess(id)
        );
      })
      .catch(res => {
        this.setState({ error: res.error, loading: false })
      })
  }

  componentDidMount() {
    if (this.emailRef.current) this.emailRef.current.focus();
  }

  render() {
    const title = 'Log In';
    const form = 'login-form';
    return (
      <article className='form'>
        <h2 className='rs-title'>{title}</h2>
        <output
          form={form}
          className={`form-status ${this.state.error ? 'fail-status' : ''}`}
        > {this.state.error || (this.state.loading && 'Loading...')}
        </output>
        <form action='' id={form}>
          <AccountInput
            form='account-settings-form'
            id='email'
            type='email'
            inputRef={el => this.emailRef = el}
            touched={this.state.email.touched}
            validate={this.validateEmail}
            update={this.updateEmail}
            hint={<sup>*</sup>} />
          <AccountInput
            form={form}
            id='password'
            type='password'
            touched={this.state.password.touched}
            validate={this.validatePassword}
            update={this.updatePassword}
            hint={<sup>*</sup>} />
          <button
            className='rs-btn rs-btn-light mt-1'
            type='submit'
            form={form}
            onClick={(e) => { this.handleSubmit(e) }}
            disabled={this.validateEmail() || this.validatePassword()}
          > {title}
          </button>
        </form>
      </article>
    );
  }
}

LoginForm.defaultProps = {
  onSuccess: () => { }
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func
}

export default withRouter(LoginForm);