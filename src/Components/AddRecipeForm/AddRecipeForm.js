import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AccountInput from '../AccountInput/AccountInput';
import AuthApiService from '../../services/auth-api-service'
import './AddRecipeForm.css';
import RecipeInput from '../RecipeInput/RecipeInput';

class AddRecipeForm extends Component {
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
    this.setState({ error: null })
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
          }
        }, this.props.onSuccess())
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    if (this.emailRef.current) this.emailRef.current.focus();
  }

  render() {
    const title = 'Add Recipe';
    const form = 'add-recipe-form';
    const { ingredients, instructions } = this.state;

    return (
      <article className='form'>
        <h2 className='lg-title'>{title}</h2>
        <output
          form={form}
          className={`form-status ${this.state.error ? 'fail-status' : ''}`}
        > {this.state.error || (this.state.loading && 'Submitting...')}
        </output>
        <form action='' id={form}>
          {/* Recipe name */}
          <RecipeInput
            form={form}
            id={'name'} 
            ref={this.nameRef}
            touched={this.state.name.touched}
            validate={this.validateName}
            update={this.updateName}
            label={<h3 className='input-label'><label htmlFor='name'>Name:</label></h3>}/>
          {/* Recipe information */}
          <h3>
            <label htmlFor='information'>Information:</label>
          </h3>
          <input
            type='text'
            id='information'
            name='information'
            onChange={(e) => this.updateInformation(e.target.value)} />
          {/* Recipe ingredients */}
          <h3>
            Ingredients:
            <span className='hint'><sup>*</sup></span>
          </h3>
          {ingredients.map((ingredient, index) =>
            <RecipeInput
              form={form}
              id={(index + 1) + '.'}
              touched={ingredient.touched}
              validate={this.validateIngredient}
              update={this.updateIngredient} />
          )}
          <button
            className='lg-btn lg-btn-light mt-1'
            type='submit'
            form={form}
            onClick={(e) => { this.handleAddIngredient(e) }}
          > Add ingredient
          </button>
          {/* Recipe instructions */}
          <h3>
            Instructions:
            <span className='hint'><sup>*</sup></span>
          </h3>
          {instructions.map((instruction, index) =>
            <RecipeInput
              form={form}
              id={(index + 1) + '.'}
              touched={instruction.touched}
              validate={this.validateInstruction}
              update={this.updateInstruction} />
          )}
          <button
            className='lg-btn lg-btn-light mt-1'
            type='submit'
            form={form}
            onClick={(e) => { this.handleAddInstruction(e) }}
          > Add instruction
          </button>
          {/* Submit */}
          <button
            className='lg-btn lg-btn-light mt-1'
            type='submit'
            form={form}
            onClick={(e) => { this.handleSubmit(e) }}
            disabled={
              this.validateName() ||
              this.validateIngredients() ||
              this.validateInstructions()}
          > {title}
          </button>
        </form>
      </article>
    );
  }
}

AddRecipeForm.defaultProps = {
  onSuccess: () => { }
}

AddRecipeForm.propTypes = {
  onSuccess: PropTypes.func
}

export default withRouter(AddRecipeForm);