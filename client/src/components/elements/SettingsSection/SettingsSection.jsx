import React from 'react';
import PropTypes from 'prop-types';

import css from './settingsSection.less';

const SettingsSection = props => (
  <section className={css.section}>
    <h2 className={css.heading}> {props.heading} </h2>
    <p className={css.text}>{props.text}</p>
    {props.children}
  </section>
);

SettingsSection.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default SettingsSection;
