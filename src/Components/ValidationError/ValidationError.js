import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ValidationError.css';

class ValidationError extends Component {
  render() {
    if (!this.props.message) return null;
    return <label htmlFor={this.props.errorFor} className='validation-error'>{this.props.message}</label>;
  }
}

ValidationError.defaultProps = {
  errorFor: '',
  message: ''
}

ValidationError.propTypes = {
  errorFor: PropTypes.string.isRequired,
  message: PropTypes.string
}

export default ValidationError;