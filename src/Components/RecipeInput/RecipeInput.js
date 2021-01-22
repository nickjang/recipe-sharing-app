import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';
import './RecipeInput.css';

class RecipeInput extends Component {
  render() {
    let inputLabel;
    if (!this.props.label) {
      inputLabel = this.props.id.replace(/-|_/g, ' ');
      inputLabel = inputLabel.charAt(0).toUpperCase() + inputLabel.slice(1);
    }

    return (
      <fieldset className='recipe-input' form={this.props.form} name={this.props.id}>
        <div className='main-input'>
          {this.props.label ||
            <label
              htmlFor={this.props.id}
              className='input-label'
            > {inputLabel}
              <span className='hint'>{this.props.hint}</span>
            </label>}
          <input
            type='text'
            id={this.props.id}
            name={this.props.id}
            ref={this.props.inputRef || null}
            aria-required='true'
            aria-describedby={this.props.id + '-error-message'}
            aria-invalid={!!this.props.validate()}
            onChange={(e) => this.props.update(e.target.value)} />
        </div>
        {this.props.touched && <ValidationError id={this.props.id + '-error-message'} errorFor={this.props.id} message={this.props.validate()} />}
      </fieldset>
    );
  };
}

RecipeInput.defaultProps = {
  form: '',
  id: '',
  touched: false,
  validate: () => { },
  update: () => { },
  inputRef: null,
  hint: '',
  label: null
}

RecipeInput.propTypes = {
  form: PropTypes.string.isRequired,
  id: PropTypes.string,
  touched: PropTypes.bool.isRequired,
  validate: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
  hint: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  label: PropTypes.element
}

export default RecipeInput;