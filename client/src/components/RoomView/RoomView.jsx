import React from 'react';

import RoomInfo from '../RoomInfo/RoomInfo';
import css from './roomView.less';

const RoomView = props => (
  <div className={css['room-view']}>
    <i className={css['room-view__back']} />
    <div className={css['room-view__room-info']}>
      <RoomInfo />
    </div>
    <i className={css['room-view__leave']} />
    <i className={css['room-view__settings']} />
  </div>
);

export default RoomView;
