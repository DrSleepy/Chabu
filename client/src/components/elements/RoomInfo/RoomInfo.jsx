import React from 'react';
import PropTypes from 'prop-types';

import css from './roomInfo.less';

const RoomInfo = props => (
  <div className={[css.room, !props.creator ? css['room-no-creator'] : null].join(' ')}>
    <h2 className={css.title}> {props.title} </h2>
    <i className={css.unlocked} />
    {props.creator && <p className={css.creator}> {props.creator} </p>}
    <p className={css.id}> {props.id} </p>
  </div>
);

RoomInfo.propTypes = {
  title: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default RoomInfo;
