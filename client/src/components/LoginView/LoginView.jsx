import React, { Component } from 'react';

import InputWithError from '../InputWithError/InputWithError';
import css from './loginView.less';

class LoginView extends Component {
  state = {
    formData: {
      username: '',
      password: ''
    },
    formErrors: {
      username: '',
      password: 'Password is required'
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

  formHandler = event => {
    event.preventDefault();
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
          errorMessage={this.state.formErrors.username}
        />
        <InputWithError
          placeholder="Password"
          value={this.state.formData.password}
          onChange={event => this.bindToState(event, 'password')}
          errorMessage={this.state.formErrors.password}
        />
        <button className={css.submit} onClick={event => this.formHandler(event)} type="submit">
          Login
        </button>
      </form>
    );
  }
}

export default LoginView;
