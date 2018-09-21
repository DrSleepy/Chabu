import React from 'react';
import { BarLoader } from 'react-spinners';

import css from './loader.less';

const Loader = props => (
  <div className={css.container}>
    <BarLoader size={36} color={'#0379ff'} loading={props.loading} />
  </div>
);

export default Loader;
