import React from 'react';
import PropTypes from 'prop-types';

import css from './roomInfo.less';

const RoomInfo = props => (
  <div className={[css.room, !props.creator ? css['room-no-creator'] : null].join(' ')}>
    <h2 className={css.title}> {props.title} </h2>
    {props.unlocked && <i className={css.unlocked} />}
    {!props.unlocked && <i className={css.locked} />}
    {props.creator && <p className={css.creator}> {props.creator} </p>}
    <p className={css.id}> {props.id} </p>
  </div>
);

RoomInfo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  creator: PropTypes.string
};

export default RoomInfo;
