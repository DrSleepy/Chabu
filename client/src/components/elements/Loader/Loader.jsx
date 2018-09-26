import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

import css from './loader.less';

const Loader = props => (
  <div className={[props.className, css.container].join(' ')}>
    <ClipLoader color={props.color || '#2d8fff'} size={props.size || 30} />
  </div>
);

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

export default Loader;
