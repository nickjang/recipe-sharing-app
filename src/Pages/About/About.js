import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import './About.css';

class About extends Component {
  state = {
    loading: false,
    error: ''
  }

  static contextType = TokenService;

  handleSignUpClick = (e) => {
    e.preventDefault();
    this.props.history.push('/sign-up');
  }

  handleDemoClick = (e) => {
    // Log into demo account
    e.preventDefault();

    this.setState({ loading: true, error: '' });
    AuthApiService.postLogin({
      email: 'demo@demo.com',
      password: 'Demo!123'
    })
      .then(res => {
        this.setState(
          { loading: false },
          () => {
            const { location, history } = this.props;
            const destination = (location.state || {}).from || '/';
            history.push(destination);
            window.location.reload();
          }
        );
      })
      .catch(res => {
        this.setState({ loading: false, error: res.error })
      })
  }

  render() {
    const hasToken = TokenService.hasAuthToken();
    return (
      <section className='about'>
        <h2 className='lg-title'>Welcome to the logging app!</h2>
        <span className={`status ${this.state.error ? 'fail-status' : ''}`}>
          {this.state.error || (this.state.loading && 'Loading...')}
        </span>
        <p>Recipe Sharing about</p>
        {!hasToken &&
          <>
            <p>You'll need to create an account or use the demo account (a shared account) to start making logs.</p>
            <p>With your own account you can create projects to store logs in. With the demo account, you won't be
                able to make new projects or update account settings, but you can use the rest of the features.</p>
            <p>You can view recipes by clicking Recipe Sharing at the top.</p>
            <div>
              <button
                className='lg-btn lg-btn-light mt-2 mr-1'
                onClick={(e) => { this.handleSignUpClick(e) }}
              > Sign Up
                </button>
              <button
                className='lg-btn lg-btn-light mt-2'
                onClick={(e) => { this.handleDemoClick(e) }}
              > Demo
                </button>
            </div>
          </>}
      </section>
    );
  }
}

export default About;