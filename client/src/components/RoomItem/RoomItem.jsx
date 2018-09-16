import React from 'react';

import RoomInfo from '../RoomInfo/RoomInfo';
import css from './roomItem.less';

const RoomItem = props => (
  <div className={css['room-item']}>
    <RoomInfo />
    <i className={css['room-item__arrow']} />
  </div>
);

export default RoomItem;
