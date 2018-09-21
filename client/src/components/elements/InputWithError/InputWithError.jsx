import React from 'react';

import css from './inputWithError.less';

const inputErrorHandler = property => {
  return property ? css['input--error'] : '';
};

const InputWithError = props => (
  <div className={css['input-container']}>
    <input
      className={[css.input, inputErrorHandler(props.errorMessage)].join(' ')}
      type={props.type || 'text'}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
    <p className={css['error-message']}> {props.errorMessage} </p>
  </div>
);

export default InputWithError;
