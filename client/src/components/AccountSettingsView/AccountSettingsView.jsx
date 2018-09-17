import React from 'react';

import SettingsHeader from '../SettingsHeader/SettingsHeader';
import SettingsSection from '../SettingsSection/SettingsSection';
import css from './accountSettingsView.less';

const AccountSettingsView = props => (
  <div className={css.settings}>
    <SettingsHeader heading="Account Settings" />

    <SettingsSection
      heading="Secure your account"
      text="Secure your account by linking your email. This allows you to recover your account if you ever forget   your email."
    >
      <input className={css.input} type="email" placeholder="Email" />
    </SettingsSection>

    <SettingsSection
      heading="Username"
      text="Toggle the switch below to hide or show your username when commenting in a question thread."
    >
      <div className={css.buttons}>
        <button className={css.buttons__button}> Lock </button>
        <button className={[css.buttons__button, css['buttons__button--selected']].join(' ')}> Unlocked </button>
      </div>
    </SettingsSection>
  </div>
);

export default AccountSettingsView;
