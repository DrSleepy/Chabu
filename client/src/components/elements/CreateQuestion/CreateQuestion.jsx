import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import InputWithError from '../InputWithError/InputWithError';
import ButtonWithLoader from '../ButtonWithLoader/ButtonWithLoader';
import server from '../../../axios';
import css from './createQuestion.less';

class CreateQuestion extends Component {
  state = {
    title: '',
    titleError: '',
    text: '',
    loader: false
  };

  bindToState = (event, property) => {
    this.setState({ [property]: event.target.value });
  };

  createQuestionHandler = async () => {
    this.setState({ loader: true, titleError: '' });

    const data = {
      title: this.state.title,
      text: this.state.text
    };
    const response = await server.post(`/rooms/${this.props.roomID}`, data).catch(error => error.response.data);
    if (response.errors) {
      const error = response.errors[0].message;
      this.setState({ titleError: error, loader: false });
      return;
    }

    this.setState({ loader: false });
    this.props.close();
    this.props.history.push(`/r/${this.props.roomID}?view=all`);
  };

  render() {
    return (
      <form className={css.question}>
        <InputWithError
          placeholder="Title"
          value={this.state.title}
          onChange={event => this.bindToState(event, 'title')}
          errorMessage={this.state.titleError}
          maxLength={100}
        />
        <textarea
          placeholder="Additional information (optional)"
          value={this.state.text}
          onChange={event => this.bindToState(event, 'text')}
          maxLength="20000"
        />
        <div className={css.actions}>
          <button className={css.actions__secondary} onClick={this.props.close}>
            Cancel
          </button>
          <ButtonWithLoader
            className={css.actions__primary}
            text="Submit"
            type="submit"
            buttonType="primary"
            spinnerColor="#fff"
            onClick={this.createQuestionHandler}
            loading={this.state.loader}
          />
        </div>
      </form>
    );
  }
}

CreateQuestion.propTypes = {
  roomID: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default withRouter(CreateQuestion);
