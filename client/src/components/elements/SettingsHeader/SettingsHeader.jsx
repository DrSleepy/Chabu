import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './settingsHeader.less';

const SettingsHeader = props => (
  <div className={css.header}>
    <Link to={props.backLink} className={css.back} />
    <h1 className={css.title}> {props.heading} </h1>
  </div>
);

SettingsHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  backLink: PropTypes.string.isRequired
};

export default SettingsHeader;
