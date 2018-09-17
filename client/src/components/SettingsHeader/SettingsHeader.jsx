import React from 'react';

import css from './settingsHeader.less';

const SettingsHeader = props => (
  <div className={css.header}>
    <i className={css.back} />
    <h1 className={css.title}> {props.heading} </h1>
  </div>
);

export default SettingsHeader;
