import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader/Loader';
import css from './buttonWithLoader.less';

const ButtonWithLoader = props => (
  <button
    className={[props.className, css[props.buttonType] || css.default].join(' ')}
    onClick={props.onClick}
    disabled={props.loading}
    type={props.type}
  >
    <span className={css.span}>
      {props.loading && <Loader color={props.spinnerColor || '#0379ff'} size={props.spinnerSize || 13} />}
      <p> {props.text} </p>
    </span>
  </button>
);

ButtonWithLoader.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonType: PropTypes.string,
  spinnerColor: PropTypes.string,
  spinnerSize: PropTypes.number
};

export default ButtonWithLoader;
