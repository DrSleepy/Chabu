import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

  likeHandler = async event => {
    event.stopPropagation();

    this.setState({ liked: !this.state.liked });
    this.state.liked ? this.setState({ likes: this.state.likes - 1 }) : this.setState({ likes: this.state.likes + 1 });
    await server.patch(`/questions/${this.props.id}/like`);
  };

  openQuestionHandler = () => {
    this.props.history.push(`/r/${this.props.room}/${this.props.id}`);
  };

  modalHandler = (event, property, boolean) => {
    event.stopPropagation();
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

    const cssIsLiked = this.state.liked ? css['thumb--true'] : css['thumb--false'];

    return (
      <Fragment>
        <div className={css.question} onClick={this.openQuestionHandler}>
          <i className={[css.thumb, cssIsLiked].join(' ')} onClick={event => this.likeHandler(event)} />
          <h3 className={css.title}>
            <Link className={css.link} to={`/r/${this.props.room}/${this.props.id}`}>
              {this.props.title}
            </Link>
          </h3>

          {isCreatedToday && <p className={css.likes}> new </p>}
          {!isCreatedToday && <p className={css.likes}> {this.state.likes} likes </p>}

          <p className={css.comments}> {this.props.comments.length} comments </p>
          <p className={css.time}> {this.props.timeAgo === 'a few seconds ago' ? 'just now' : this.props.timeAgo} </p>

          {shouldSeeDelete && <i className={css.delete} onClick={event => this.modalHandler(event, 'deleteModal', true)} />}
        </div>
        {this.state.deleteModal.modal && (
          <DeleteQuestionModal
            roomID={this.props.room}
            questionID={this.props.id}
            close={event => this.modalHandler(event, 'deleteModal', false)}
          />
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
)(withRouter(QuestionItem));
