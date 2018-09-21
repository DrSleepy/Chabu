import React from 'react';

import SettingsHeader from '../../elements/SettingsHeader/SettingsHeader';
import SettingsSection from '../../elements/SettingsSection/SettingsSection';
import css from './roomSettings.less';

const RoomSettingsView = props => (
  <div className={css.settings}>
    <SettingsHeader heading="Room Settings" />

    <SettingsSection heading="Edit" text="Change room info by editing the fields below.">
      <input className={css.section__input} type="text" placeholder="Title" />
      <input className={css.section__input} type="text" placeholder="Creator" />
    </SettingsSection>

    <SettingsSection
      heading="Activity"
      text="Unlocking the room prevents any further messages from being added to the room."
    >
      <div className={css.buttons}>
        <button className={css.buttons__button}> Lock </button>
        <button className={[css.buttons__button, css['buttons__button--selected']].join(' ')}> Unlocked </button>
      </div>
    </SettingsSection>

    <div className={css.footer}>
      <button className={css.footer__update}> Update </button>
    </div>
  </div>
);

export default RoomSettingsView;
