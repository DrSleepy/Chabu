import React, { Component } from 'react';

import server from '../../axios';
import { appendErrorsHandler } from '../../helpers/errorHandlers';
import InputWithError from '../InputWithError/InputWithError';
import css from './loginView.less';

class LoginView extends Component {
  state = {
    formData: {
      username: '',
      password: ''
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
    this.resetErrorsHandler();

    const response = await server.post('login', { ...this.state.formData }).catch(error => error.response.data);

    // handle errors
    if (response.details || response.errors) {
      const errors = response.details || response.errors;
      const formErrors = appendErrorsHandler(errors, this.state.formErrors);
      this.setState({ formErrors });
    }
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
        <button className={css.submit} onClick={event => this.formHandler(event)} type="submit">
          Login
        </button>
      </form>
    );
  }
}

export default LoginView;
