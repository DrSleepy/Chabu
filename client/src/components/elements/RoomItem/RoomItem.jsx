import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import RoomInfo from '../RoomInfo/RoomInfo';
import css from './roomItem.less';

const RoomItem = props => (
  <Link className={css.room} to={`/r/${props.id}?view=all`}>
    <RoomInfo {...props} />
    <i className={css.arrow} />
  </Link>
);

RoomItem.propTypes = {
  id: PropTypes.string.isRequired
};

export default RoomItem;
