import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import DeleteQuestionModal from '../DeleteQuestionModal/DeleteQuestionModal';
import mapStateToProps from '../../../store/state';
import mapDispatchToProps from '../../../store/dispatch';
import server from '../../../axios';
import css from './questionItem.less';

class QuestionItem extends Component {
  state = {
    liked: false,
    likes: 0,
    deleteModal: false
  };

  likeHandler = async () => {
    this.setState({ liked: !this.state.liked });
    this.state.liked ? this.setState({ likes: this.state.likes - 1 }) : this.setState({ likes: this.state.likes + 1 });
    await server.patch(`/questions/${this.props.id}/like`);
  };

  modalHandler = (property, boolean) => {
    this.setState({ [property]: { ...this.state[property], modal: boolean } });
  };

  appendPropsToState = () => {
    const liked = this.props.likedBy.includes(this.props.accountID);
    this.setState({ liked, likes: this.props.likedBy.length });
  };

  componentWillMount = () => {
    this.appendPropsToState();
  };

  render() {
    const createdAt = moment(this.props.date).format('MMM Do YY');
    const dateToday = moment(new Date()).format('MMM Do YY');
    const isCreatedToday = createdAt === dateToday;

    const createdByMe = this.props.accountID === this.props.account;
    const isRoomCreator = this.props.roomCreator === this.props.accountID;

    const shouldSeeDelete = isRoomCreator || createdByMe;

    const roomID = window.location.pathname.replace('/r/', '');

    const cssIsLiked = this.state.liked ? css['thumb--true'] : css['thumb--false'];
    const cssQuestionToday = isCreatedToday ? css['question-today'] : '';

    return (
      <Fragment>
        <div className={[css.question, cssQuestionToday].join(' ')}>
          <i className={[css.thumb, cssIsLiked].join(' ')} onClick={this.likeHandler} />
          <h3 className={css.title}>
            <Link className={css.link} to={`${roomID}/${this.props.id}`}>
              {this.props.title}
            </Link>
          </h3>

          {!isCreatedToday && <p className={css.likes}> {this.state.likes} likes </p>}

          <p className={css.comments}> {this.props.comments.length} comments </p>
          <p className={css.time}> {this.props.timeAgo} </p>

          {shouldSeeDelete && <i className={css.delete} onClick={() => this.modalHandler('deleteModal', true)} />}
        </div>
        {this.state.deleteModal.modal && (
          <DeleteQuestionModal questionID={this.props.id} close={() => this.modalHandler('deleteModal', false)} />
        )}
      </Fragment>
    );
  }
}

QuestionItem.propTypes = {
  timeAgo: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likedBy: PropTypes.array,
  roomCreator: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionItem);
