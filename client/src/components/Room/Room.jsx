import React from 'react';

import css from './room.less';

const RoomInfo = props => (
  <div className={css['room-info']}>
    <h2 className={css['room-info__title']}> Computer Science - Pipelines</h2>
    <i className={css['room-info__unlocked']} />
    <p className={css['room-info__creator']}> Dr Pushpa King </p>
    <p className={css['room-info__code']}> Exd3D4F</p>
  </div>
);

const Room = props => {
  let roomComponent = (
    <div className={css['room-closed']}>
      <RoomInfo status={props.status} />
      <i className={css['room-closed__arrow']} />
    </div>
  );

  if (props.status === 'open') {
    roomComponent = (
      <div className={css['room-open']}>
        <i className={css['room-open__back']} />
        <div className={css['room-open__room-info']}>
          <RoomInfo status={props.status} />
        </div>
        <i className={css['room-open__leave']} />
        <i className={css['room-open__settings']} />
      </div>
    );
  }

  return roomComponent;
};

export default Room;
