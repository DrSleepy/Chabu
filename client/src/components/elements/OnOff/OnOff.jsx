import React from 'react';
import PropTypes from 'prop-types';

import css from './onOff.less';

const OnOff = props => {
  const cssState = props.state ? css['background--off'] : '';

  return (
    <div className={css.container}>
      <div className={[css.background, cssState].join(' ')} />
      <button className={css.button} onClick={() => props.toggler(true)}>
        {props.onText}
      </button>
      <button className={css.button} onClick={() => props.toggler(false)}>
        {props.offText}
      </button>
    </div>
  );
};

OnOff.propTypes = {
  state: PropTypes.bool.isRequired,
  toggler: PropTypes.func.isRequired,
  onText: PropTypes.string.isRequired,
  offText: PropTypes.string.isRequired
};

export default OnOff;
