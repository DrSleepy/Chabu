import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import server from '../../../axios';

class deleteQuestionModal extends Component {
  state = {
    loader: false
  };

  deleteQuestionHandler = async () => {
    this.setState({ loader: true });

    const isInsideRoom = this.props.location.pathname === '/created-questions';
    await server.delete(`/rooms/${this.props.roomID}/${this.props.questionID}`).catch(error => error.response);

    if (!isInsideRoom) {
      this.props.history.replace(`${this.props.roomID}?view=all`);
      return;
    }

    this.props.history.push('/created-questions');
  };

  render() {
    return (
      <Modal
        type="danger"
        titleText="Delete Question"
        buttonText="Delete"
        buttonLoader={this.state.loader}
        onSubmit={this.deleteQuestionHandler}
        onClose={this.props.onClose}
      >
        <p> Please confirm your choice to delete </p>
      </Modal>
    );
  }
}

deleteQuestionModal.propTypes = {
  questionID: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withRouter(deleteQuestionModal);
