import React, { Component } from 'react';
import { connect } from 'react-redux';

import mapDispatchToProps from '../../../store/dispatch';
import SettingsHeader from '../../elements/SettingsHeader/SettingsHeader';
import SettingsSection from '../../elements/SettingsSection/SettingsSection';
import InputWithError from '../../elements/InputWithError/InputWithError';
import ButtonWithLoader from '../../elements/ButtonWithLoader/ButtonWithLoader';
import server from '../../../axios';
import css from './accountSettings.less';

class AccountSettings extends Component {
  state = {
    off: false,
    sent: false,
    sending: false,
    email: {
      value: '',
      error: '',
      verified: false
    }
  };

  sendEmail = async () => {
    this.setState({ sending: true, email: { ...this.state.email, error: '' } });

    const response = await server.post('accounts/verify', { email: this.state.email.value }).catch(error => error.response);
    if (!response) return;

    if (response.data.status === 500) {
      this.setState({ sending: false, email: { ...this.state.email, error: 'Failed to send email' } });
      return;
    }

    if (response.data.errors.length) {
      const error = response.data.errors[0].message;
      this.setState({ sending: false, email: { ...this.state.email, error } });
      return;
    }

    if (response.data.ok) {
      this.setState({ sent: true });
    }

    this.setState({ sending: false });
  };

  showUsernameHandler = async boolean => {
    this.setState({ off: boolean });
    const response = await server.patch('accounts/', { showUsername: boolean }).catch(error => error.response);
    if (!response) return;
  };

  appendSettingsToState = async () => {
    const response = await server.get('accounts/').catch(error => error.response);
    if (!response) return;

    if (response.data.data.email) {
      this.setState({ email: { ...this.state.email, verified: true } });
    }

    const { showUsername, email } = response.data.data;
    this.setState({ off: showUsername, email: { ...this.state.email, value: email } });
  };

  logoutHandler = async () => {
    await server.post('logout').catch(error => error.response);
    this.props.unsetAccount();
  };

  bindToState = event => {
    this.setState({ email: { ...this.state.email, value: event.target.value } });
  };

  componentWillMount = () => {
    this.appendSettingsToState();
  };

  render() {
    const cssOff = this.state.off ? css['buttons__background--off'] : null;

    return (
      <div className={css.settings}>
        <SettingsHeader backLink="/joined-rooms" heading="Account Settings" />

        <SettingsSection
          heading="Secure your account"
          text="Secure your account by linking your email. This allows you to recover your account if you ever forget   your email."
        >
          <InputWithError
            type="email"
            placeholder="Email"
            onChange={event => this.bindToState(event)}
            errorMessage={this.state.email.error}
            value={this.state.email.value}
            disabled={this.state.email.verified}
          />

          {this.state.sent && <p className={css.sent}> Sent </p>}

          {!this.state.email.verified &&
            !this.state.sent && (
              <ButtonWithLoader
                className={css.send}
                text="Send"
                buttonType="primary"
                spinnerColor="#fff"
                loading={this.state.sending}
                onClick={this.sendEmail}
              />
            )}
        </SettingsSection>

        <SettingsSection
          heading="Username"
          text="Toggle the switch below to hide or show your username when commenting in a question thread."
        >
          <div className={css.buttons}>
            <div className={[css.buttons__background, cssOff].join(' ')} />
            <button className={css.buttons__button} onClick={() => this.showUsernameHandler(true)}>
              Show
            </button>
            <button className={css.buttons__button} onClick={() => this.showUsernameHandler(false)}>
              Hide
            </button>
          </div>
        </SettingsSection>
        <button className={css.logout} onClick={this.logoutHandler}>
          Logout
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AccountSettings);
