import React from 'react';

import RoomInfo from '../RoomInfo/RoomInfo';
import css from './roomItem.less';

const RoomItem = props => (
  <div className={css.room}>
    <RoomInfo />
    <i className={css.arrow} />
  </div>
);

export default RoomItem;
