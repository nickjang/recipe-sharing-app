import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';
import './RecipeInput.css';

class RecipeInput extends Component {
  render() {
    const validationError = this.props.touched && <ValidationError id={this.props.id + '-error-message'} errorFor={this.props.id} message={this.props.validate()} />;

    if (this.props.label) {
      return (
        <fieldset className='recipe-input' form={this.props.form} name={this.props.id}>
          <div className='main-input'>
            {this.props.label}
            <input
              type='text'
              id={this.props.id}
              name={this.props.id}
              ref={this.props.inputRef || null}
              aria-describedby={this.props.id + '-error-message'}
              aria-invalid={!!this.props.validate()}
              onChange={(e) => this.props.update(e.target.value)} />
          </div>
          {validationError}
        </fieldset>
      );
    } else if (this.props.ariaLabel) {
      return (
        <li className='recipe-input' form={this.props.form} name={this.props.id}>
          <input
            type='text'
            id={this.props.id}
            name={this.props.id}
            ref={this.props.inputRef || null}
            aria-label={this.props.ariaLabel}
            aria-describedby={this.props.id + '-error-message'}
            aria-invalid={!!this.props.validate()}
            onChange={(e) => this.props.update(e.target.value)} />
          {validationError}
        </li>
      );
    }
  }
}

RecipeInput.defaultProps = {
  form: '',
  id: '',
  touched: false,
  validate: () => { },
  update: () => { },
  inputRef: null,
  label: null,
  ariaLabel: ''
}

RecipeInput.propTypes = {
  form: PropTypes.string.isRequired,
  id: PropTypes.string,
  touched: PropTypes.bool,
  validate: PropTypes.func,
  update: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
  label: PropTypes.element,
  ariaLabel: PropTypes.string
}

export default RecipeInput;