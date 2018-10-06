import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import server from '../../../axios';

class PostCommentModal extends Component {
  state = {
    loader: false,
    text: ''
  };

  bindToState = (event, property) => {
    this.setState({ [property]: event.target.value });
  };

  postCommentHandler = async () => {
    this.setState({ loader: true });
    const questionID = this.props.location.pathname.split('/')[3];
    const endpoint = this.props.commentID ? `/comments/${this.props.commentID}` : `/questions/${questionID}`;

    const data = { text: this.state.text };
    await server.post(endpoint, data).catch(error => error.response);

    this.setState({ loader: false, text: '' });
    this.props.reloadQuestion();
    this.props.onClose();
  };

  render() {
    return (
      <Modal
        titleText="Post Comment"
        buttonText="Post"
        buttonLoader={this.state.loader}
        onSubmit={this.postCommentHandler}
        onClose={this.props.onClose}
      >
        <textarea
          placeholder="Type your comment here..."
          value={this.state.text}
          onChange={event => this.setState({ text: event.target.value })}
          maxLength="20000"
        />
      </Modal>
    );
  }
}

PostCommentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  reloadQuestion: PropTypes.func.isRequired
};

export default withRouter(PostCommentModal);
