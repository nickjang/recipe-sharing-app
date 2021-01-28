import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import AccountInput from '../AccountInput/AccountInput';
import AuthApiService from '../../services/auth-api-service'
import caramelImg from '../../assets/images/caramel.jpg';
import './SignUpForm.css';

class SignUpForm extends Component {
  state = {
    email: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false
    },
    full_name: {
      value: '',
      touched: false
    },
    nickname: {
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

  updateFullName = (full_name) => {
    this.setState({ full_name: { value: full_name, touched: true } });
  }

  updateNickname = (nickname) => {
    this.setState({ nickname: { value: nickname, touched: true } });
  }

  validateEmail = () => {
    const email = this.state.email.value.trim();
    if (!email) return 'Email cannot be empty.';
    if (!email.includes('@')) return 'Email must include \'@\'.';
    if (!email.split('@')[1].includes('.')) return 'Email must include a \'.\'.';
    if (email.length < 5) return 'Please enter a valid email.';
    return;
  }

  REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;

  validatePassword = () => {
    const password = this.state.password.value.trim();
    if (!password) return 'Password cannot be empty.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password.length > 72) return 'Password be less than 72 characters.';
    if (password.startsWith(' ') || password.endsWith(' '))
      return 'Password must not start or end with empty spaces.';
    if (!this.REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password))
      return 'Password must contain one upper case, lower case, number and special character.';
    return;
  }

  validateFullName = () => {
    const full_name = this.state.full_name.value.trim();
    if (!full_name) return 'Full name cannot be empty.';
    return;
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ error: null, loading: true })
    AuthApiService.postUser({
      email: this.state.email.value,
      password: this.state.password.value,
      full_name: this.state.full_name.value,
      nickname: this.state.nickname.value,
    })
      .then(res => {
        this.setState({
          email: {
            value: '',
            touched: false
          },
          password: {
            value: '',
            touched: false
          },
          full_name: {
            value: '',
            touched: false
          },
          nickname: {
            value: '',
            touched: false
          },
          loading: false
        }, () => this.props.onSuccess())
      })
      .catch(({ error }) => {
        this.setState({ error, loading: false })
      })
  }

  componentDidMount() {
    if (this.emailRef.current) this.emailRef.current.focus();
  }

  render() {
    const title = 'Sign Up';
    const form = 'sign-up-form';
    return (
      <article>
        <Parallax
          blur={0}
          bgImage={caramelImg}
          bgImageAlt="Caramel oozing out of stacked macarons"
          className='misc-page-title'
          bgClassName='misc-page-img'
          strength={200}
        >
          <h2 className='page-title rs-title'>{title}</h2>
        </Parallax>
        <div className='form'>
          <h3 className='rs-title'>{title}</h3>
          <output
            form={form}
            className={`form-status ${this.state.error ? 'fail-status' : ''}`}
          > {this.state.error || (this.state.loading && 'Loading...')}
          </output>
          <form action='' id={form}>
            <AccountInput
              form={form}
              id='full_name'
              type='text'
              touched={this.state.full_name.touched}
              validate={this.validateFullName}
              update={this.updateFullName}
              hint={<sup>*</sup>} />
            <AccountInput
              form={form}
              id='nickname'
              type='text'
              touched={this.state.nickname.touched}
              validate={() => { }}
              update={this.updateNickname} />
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
              disabled={
                this.validateEmail() ||
                this.validatePassword() ||
                this.validateFullName()}
            > {title}
            </button>
          </form>
        </div>
      </article>
    );
  }
}

SignUpForm.defaultProps = {
  onSuccess: () => { }
}

SignUpForm.propTypes = {
  onSuccess: PropTypes.func
}

export default withRouter(SignUpForm);