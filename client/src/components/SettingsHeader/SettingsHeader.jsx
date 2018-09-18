import React from 'react';
import { Link } from 'react-router-dom';

import css from './settingsHeader.less';

const SettingsHeader = props => (
  <div className={css.header}>
    <Link to="/" className={css.back} />
    <h1 className={css.title}> {props.heading} </h1>
  </div>
);

export default SettingsHeader;
