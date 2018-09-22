import React, { Component } from 'react';

import SettingsHeader from '../../elements/SettingsHeader/SettingsHeader';
import SettingsSection from '../../elements/SettingsSection/SettingsSection';
import css from './accountSettings.less';

class AccountSettings extends Component {
  state = {
    off: false
  };

  render() {
    const cssOff = this.state.off ? css['buttons__background--off'] : null;

    return (
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
            <div className={[css.buttons__background, cssOff].join(' ')} />
            <button className={css.buttons__button} onClick={() => this.setState({ off: true })}>
              Show
            </button>
            <button className={css.buttons__button} onClick={() => this.setState({ off: false })}>
              Hide
            </button>
          </div>
        </SettingsSection>
      </div>
    );
  }
}

export default AccountSettings;
