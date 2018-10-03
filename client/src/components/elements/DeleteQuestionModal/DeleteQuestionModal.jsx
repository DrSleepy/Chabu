import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import ButtonWithLoader from '../ButtonWithLoader/ButtonWithLoader';
import server from '../../../axios';
import css from './deleteQuestionModal.less';

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
      <Modal titleText="Delete Question" titleColor="#ef4573" close={this.props.close}>
        <p> Please confirm your choice to delete </p>
        <div className={css['modal-actions']}>
          <button className={css['modal-actions__secondary']} onClick={this.props.close}>
            Cancel
          </button>
          <ButtonWithLoader
            className={css['modal-actions__primary']}
            text="Delete"
            buttonType="primary--danger"
            spinnerColor="#fff"
            onClick={this.deleteQuestionHandler}
            loading={this.state.loader}
          />
        </div>
      </Modal>
    );
  }
}

deleteQuestionModal.propTypes = {
  questionID: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default withRouter(deleteQuestionModal);
