import React from 'react';

import css from './roomInfo.less';

const RoomInfo = props => (
  <div className={css.room}>
    <h2 className={css.title}> Computer Science - Pipelines</h2>
    <i className={css.unlocked} />
    <p className={css.creator}> Dr Pushpa King </p>
    <p className={css.code}> Exd3D4F</p>
  </div>
);

export default RoomInfo;
