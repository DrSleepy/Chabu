import React, { Component } from 'react';

import SettingsHeader from '../../elements/SettingsHeader/SettingsHeader';
import SettingsSection from '../../elements/SettingsSection/SettingsSection';
import InputWithError from '../../elements/InputWithError/InputWithError';
import ButtonWithLoader from '../../elements/ButtonWithLoader/ButtonWithLoader';
import server from '../../../axios';
import css from './accountSettings.less';

class AccountSettings extends Component {
  state = {
    off: false,
    sending: false,
    email: {
      value: '',
      error: ''
    }
  };

  sendEmail = async () => {
    this.setState({ sending: true, email: { ...this.state.email, error: '' } });

    const response = await server.post('accounts/verify', { email: this.state.email.value }).catch(error => error.response);
    if (!response) return;

    // handle errors
    if (response.data.details || response.data.errors) {
      const error = response.data.details[0].message || response.data.errors[0].message;
      this.setState({ sending: false, email: { ...this.state.email, error } });
      return;
    }

    this.setState({ sending: false });
  };

  bindToState = event => {
    this.setState({ email: { ...this.state.email, value: event.target.value } });
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
          <InputWithError
            type="email"
            placeholder="Email"
            onChange={event => this.bindToState(event)}
            errorMessage={this.state.email.error}
          />

          <ButtonWithLoader
            className={css.send}
            text="Send"
            loading={this.state.sending}
            onClick={this.sendEmail}
            disabled={this.state.sending}
          />
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
        <button className={css.logout}> Logout </button>
      </div>
    );
  }
}

export default AccountSettings;
