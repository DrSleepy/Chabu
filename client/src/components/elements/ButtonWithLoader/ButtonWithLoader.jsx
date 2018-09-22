import React from 'react';

import Loader from '../Loader/Loader';
import css from './buttonWithLoader.less';

const ButtonWithLoader = props => (
  <button className={[props.className, css.container].join(' ')} onClick={props.onClick} disabled={props.disabled}>
    <span className={css.span}>
      {props.loading && <Loader color={'#fff'} size={13} />}
      <p> {props.text} </p>
    </span>
  </button>
);

export default ButtonWithLoader;
