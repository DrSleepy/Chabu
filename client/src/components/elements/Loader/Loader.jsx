import React from 'react';
import { ClipLoader } from 'react-spinners';

import css from './loader.less';

const Loader = props => (
  <div className={css.container}>
    <ClipLoader color={'#2d8fff'} />
  </div>
);

export default Loader;
