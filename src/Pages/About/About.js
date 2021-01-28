import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import UserService from '../../services/user-service';
import caramelImg from '../../assets/images/caramel.jpg';
import './About.css';

class About extends Component {
  state = {
    loading: false,
    error: ''
  }

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
      .then(({ id }) => {
        this.setState(
          { loading: false },
          () => {
            UserService.saveUserId(id);
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
        <Parallax
          blur={0}
          bgImage={caramelImg}
          bgImageAlt="Caramel oozing out of stacked macarons"
          className='misc-page-title'
          bgClassName='misc-page-img'
          strength={200}
        >
          <h2 className='page-title rs-title'>Welcome to the recipe sharing app!</h2>
        </Parallax>
        <div className='about-body'>
          <span className={`status ${this.state.error ? 'fail-status' : ''}`}>
            {this.state.error || (this.state.loading && 'Loading...')}
          </span>
          <p className='note'>You can view recipes added by other users, or add and view your own recipes.</p>
          <p className='note'>Go to 'Add Recipe' to add a recipe with a name, information, ingredients, and instructions.</p>
          <p className='note'>
            Go to 'My Recipes' to view your recipes. If you click on the name of your recipe, you'll be led to your recipe's page. You'll
            see a button to edit the recipe if you are the author. When you're on the editting page you can update or delete your recipe.
        </p>
          {
            !hasToken &&
            <>
              <p className='note'>You'll need to create an account to add, edit, or delete a recipe and access a list of your recipes.</p>
              <p className='note'>
                With the demo account, you won't able to do these things, but you can see what it's like to have an
                account and view differences in features available.
            </p>
              <p className='note'>You can view recipes by clicking 'Recipe Sharing' at the top, which is available to both visitors and users.</p>
              <div>
                <button
                  className='rs-btn rs-btn-light mt-2 mr-1'
                  onClick={(e) => { this.handleSignUpClick(e) }}
                > Sign Up
                </button>
                <button
                  className='rs-btn rs-btn-light mt-2'
                  onClick={(e) => { this.handleDemoClick(e) }}
                > Demo
                </button>
              </div>
            </>
          }
        </div>
      </section >
    );
  }
}

About.defaultProps = {
  history: {
    push: () => { }
  }
}

export default About;