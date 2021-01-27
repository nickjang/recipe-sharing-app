import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';
import './RecipeInput.css';

class RecipeInput extends Component {
  render() {
    const { form, id, label, value, touched,
      inputRef, ariaLabel, validate, update } = this.props;
    const validationError = (touched &&
      <ValidationError id={id + '-error-message'} errorFor={id} message={validate()} />);

    if (label) {
      return (
        <fieldset className='recipe-input' form={form} name={id}>
          <div className='main-input'>
            {label}
            <input
              type='text'
              id={id}
              value={value}
              name={id}
              ref={inputRef || null}
              aria-describedby={id + '-error-message'}
              aria-invalid={!!validate()}
              onChange={(e) => update(e.target.value)} />
          </div>
          {validationError}
        </fieldset>
      );
    } else if (ariaLabel) {
      return (
        <li className='recipe-input' form={form} name={id}>
          <input
            type='text'
            id={id}
            name={id}
            value={value}
            ref={inputRef || null}
            aria-label={ariaLabel}
            aria-describedby={id + '-error-message'}
            aria-invalid={!!validate()}
            onChange={(e) => update(e.target.value)} />
          {validationError}
        </li>
      );
    }
  }
}

RecipeInput.defaultProps = {
  form: '',
  id: '',
  value: '',
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
  value: PropTypes.string,
  touched: PropTypes.bool,
  validate: PropTypes.func,
  update: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
  label: PropTypes.element,
  ariaLabel: PropTypes.string
}

export default RecipeInput;