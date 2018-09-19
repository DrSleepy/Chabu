import React from 'react';
import { Link } from 'react-router-dom';

import RoomInfo from '../RoomInfo/RoomInfo';
import css from './roomItem.less';

const RoomItem = props => (
  <Link className={css.room} to="/r/r">
    <RoomInfo {...props} />
    <i className={css.arrow} />
  </Link>
);

export default RoomItem;
