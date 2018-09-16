import React from 'react';

import css from './roomInfo.less';

const RoomInfo = props => (
  <div className={css['room-info']}>
    <h2 className={css['room-info__title']}> Computer Science - Pipelines</h2>
    <i className={css['room-info__unlocked']} />
    <p className={css['room-info__creator']}> Dr Pushpa King </p>
    <p className={css['room-info__code']}> Exd3D4F</p>
  </div>
);

export default RoomInfo;
