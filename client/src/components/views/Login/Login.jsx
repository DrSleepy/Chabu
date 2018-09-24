import React, { Component } from 'react';
import { connect } from 'react-redux';

import ButtonWithLoader from '../../elements/ButtonWithLoader/ButtonWithLoader';

import mapDispatchToProps from '../../../store/dispatch';
import appendErrorsHandler from '../../../helpers/appendErrorsHandler';
import InputWithError from '../../elements/InputWithError/InputWithError';
import server from '../../../axios';
import css from './login.less';

class Login extends Component {
  state = {
    loggingIn: false,
    formData: {
      username: 'sleepy',
      password: '12345678'
    },
    formErrors: {
      username: [],
      password: []
    }
  };

  bindToState = (event, property) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [property]: event.target.value
      }
    });
  };

  resetErrorsHandler = () => this.setState({ formErrors: { username: [], password: [] } });

  formHandler = async event => {
    event.preventDefault();

    this.setState({ loggingIn: true });
    this.resetErrorsHandler();

    const response = await server.post('login', { ...this.state.formData }).catch(error => error.response);
    if (!response) {
      this.setState({ loggingIn: false });
      return;
    }

    // handle errors
    if (response.data.errors.length) {
      const errors = response.data.errors;
      const formErrors = appendErrorsHandler(errors, this.state.formErrors);

      this.setState({ loggingIn: false, formErrors });
      return;
    }

    this.setState({ loggingIn: false });

    // handle store changes
    this.props.setAccount({ accountID: response.data.data.accountID });
    this.props.history.push('/joined-rooms');
  };

  render() {
    return (
      <form className={css.form}>
        <h1 className={css.company}> Chabu </h1>
        <h2 className={css.title}> Login </h2>
        <InputWithError
          placeholder="Username"
          value={this.state.formData.username}
          onChange={event => this.bindToState(event, 'username')}
          errorMessage={this.state.formErrors.username[0]}
        />
        <InputWithError
          placeholder="Password"
          value={this.state.formData.password}
          onChange={event => this.bindToState(event, 'password')}
          errorMessage={this.state.formErrors.password[0]}
        />
        <ButtonWithLoader
          className={css.submit}
          buttonType="default"
          text="Login"
          onClick={event => this.formHandler(event)}
          loading={this.state.loggingIn}
        />
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
