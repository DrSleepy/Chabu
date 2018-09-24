import React from 'react';

import Loader from '../Loader/Loader';
import css from './buttonWithLoader.less';

const ButtonWithLoader = props => {
  return (
    <button className={[props.className, css[props.buttonType]].join(' ')} onClick={props.onClick} disabled={props.loading}>
      <span className={css.span}>
        {props.loading && <Loader color={props.spinnerColor || '#0379ff'} size={props.spinnerSize || 13} />}
        <p> {props.text} </p>
      </span>
    </button>
  );
};

export default ButtonWithLoader;
