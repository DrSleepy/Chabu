import React from 'react';
import { ClipLoader } from 'react-spinners';

import css from './loader.less';

const Loader = props => (
  <div className={css.container}>
    <ClipLoader color={props.color || '#2d8fff'} size={props.size || 30} />
  </div>
);

export default Loader;
