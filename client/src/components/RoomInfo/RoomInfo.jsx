import React from 'react';

import css from './roomInfo.less';

const RoomInfo = props => (
  <div className={css['room']}>
    <h2 className={css['room__title']}> Computer Science - Pipelines</h2>
    <i className={css['room__unlocked']} />
    <p className={css['room__creator']}> Dr Pushpa King </p>
    <p className={css['room__code']}> Exd3D4F</p>
  </div>
);

export default RoomInfo;
