import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';
import './AccountInput.css';

class AccountInput extends Component {
  render() {
    let inputLabel = this.props.id.replace(/-|_/g, ' ');
    inputLabel = inputLabel.charAt(0).toUpperCase() + inputLabel.slice(1) + ':';

    return (
      <fieldset className='account-input' form={this.props.form} name={this.props.id}>
        <div className='main-input'>
          <label
            htmlFor={this.props.id}
            className='input-label'
          > {inputLabel}
            <span className='hint'>{this.props.hint}</span>
          </label>
          <input
            type={this.props.type}
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

AccountInput.defaultProps = {
  form: '',
  id: '',
  type: '',
  touched: false,
  validate: () => { },
  update: () => { },
  inputRef: null,
  hint: ''
}

AccountInput.propTypes = {
  form: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  validate: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
  hint: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ])
}

export default AccountInput;