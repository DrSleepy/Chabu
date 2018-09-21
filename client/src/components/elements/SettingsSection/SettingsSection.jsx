import React from 'react';

import css from './settingsSection.less';

const SettingsSection = props => (
  <section className={css.section}>
    <h2 className={css.heading}> {props.heading} </h2>
    <p className={css.text}>{props.text}</p>
    {props.children}
  </section>
);

export default SettingsSection;
