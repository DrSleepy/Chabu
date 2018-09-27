import React from 'react';
import PropTypes from 'prop-types';

import css from './inputWithError.less';

const InputWithError = props => {
  const cssErrorStyle = props.errorMessage ? css['input--error'] : null;

  return (
    <div className={css['input-container']}>
      <input
        className={[css.input, cssErrorStyle].join(' ')}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={props.value || ''}
        onChange={props.onChange}
        disabled={props.disabled}
        maxLength={props.maxLength}
      />
      <p className={css['error-message']}> {props.errorMessage} </p>
    </div>
  );
};

InputWithError.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number
};

export default InputWithError;
