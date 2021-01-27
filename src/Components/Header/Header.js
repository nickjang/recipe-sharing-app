import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';
import UserService from '../../services/user-service';
import './Header.css';

class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    UserService.clearUserId();
    window.location.reload();
  }

  renderMainHeader = () => {
    return (
      <header>
        <h1>
          <Link to='/'>Recipe Sharing</Link>
        </h1>
        <nav>
          <div className='right-link-container'>
            <ul>
              <div className='inner-group'>
                <li>
                  <NavLink to='/about'>About</NavLink>
                </li>
                <li>
                  <NavLink to='/recipes/add'>Add Recipe</NavLink>
                </li>
                <li>
                  <NavLink to={`/users/${UserService.getUserId()}/recipes`}>My Recipes</NavLink>
                </li>
              </div>
              <div className='inner-group'>
                <li>
                  <NavLink onClick={this.handleLogoutClick} to='/'>Logout</NavLink>
                </li>
                <li>
                  <NavLink to='/settings'>Settings</NavLink>
                </li>
              </div>
            </ul>
          </div>
        </nav>
      </header >
    );
  }

  renderPublicHeader = () => {
    return (
      <header>
        <h1>
          <Link to='/'>Recipe Sharing</Link>
        </h1>
        <nav>
          <div className='right-link-container'>
            <ul>
              <li>
                <NavLink to='/about'>Getting Started</NavLink>
              </li>
              <li>
                <NavLink to='/sign-up'>Sign up</NavLink>
              </li>
              <li>
                <NavLink to='/login'>Log in</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

  render() {
    return TokenService.hasAuthToken()
      ? this.renderMainHeader()
      : this.renderPublicHeader();
  }
}

export default Header;