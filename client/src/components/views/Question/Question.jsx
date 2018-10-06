import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import mapStateToProps from '../../../store/state';
import Comment from '../../elements/Comment/Comment';
import Modal from '../../elements/Modal/Modal';
import DeleteQuestionModal from '../../elements/DeleteQuestionModal/DeleteQuestionModal';
import PostCommentModal from '../../elements/PostCommentModal/PostCommentModal';
import Loader from '../../elements/Loader/Loader';
import server from '../../../axios';
import css from './question.less';

class Question extends Component {
  state = {
    loading: true,
    id: '',
    title: '',
    text: '',
    account: '',
    timeAgo: '',
    likes: 0,
    liked: false,
    edited: false,
    likedBy: [],
    comments: [],
    deleteModal: false,
    postCommentModal: false,
    editModal: {
      modal: false,
      loader: false,
      text: ''
    }
  };

  newCommentHandler = newComment => {
    this.setState({ comments: [...this.state.comments, newComment.id] });
  };

  likeHandler = async () => {
    this.setState({ liked: !this.state.liked });
    this.state.liked ? this.setState({ likes: this.state.likes - 1 }) : this.setState({ likes: this.state.likes + 1 });
    await server.patch(`/questions/${this.state.id}/like`);
  };

  editQuestionHandler = async () => {
    this.setState({ editModal: { ...this.state.editModal, loader: true } });

    const data = { text: this.state.text };
    await server.patch(`/questions/${this.state.id}`, data).catch(error => error.response);

    this.setState({ editModal: { ...this.state.editModal, loader: false, modal: false } });
  };

  setupQuestion = async () => {
    this.setState({ loading: true });

    const questionID = this.props.location.pathname.split('/')[3];
    const response = await server.get(`/questions/${questionID}`).catch(error => error.response.data);
    if (!response.data) {
      this.props.history.replace('/joined-rooms');
      return;
    }

    const liked = response.data.data.likedBy.includes(this.props.accountID);

    this.setState({
      loading: false,
      likes: response.data.data.likedBy.length,
      liked: liked,
      ...response.data.data,
      editModal: {
        ...this.state.editModal,
        text: response.data.data.text
      }
    });
  };

  modalHandler = (property, boolean) => {
    this.setState({ [property]: { ...this.state[property], modal: boolean } });
  };

  componentWillMount = () => {
    this.setupQuestion();
  };

  render() {
    const createdByMe = this.props.accountID === this.state.account;
    const cssHasText = this.state.text ? css['body--with-text'] : '';
    const cssIsLikedButton = this.state.liked && css['details__likes-button--liked'];
    const cssIsLikedSpan = this.state.liked && css['details__likes-span--liked'];
    const roomID = this.props.location.pathname.split('/')[2];

    return (
      <Fragment>
        <div className={css.question}>
          <div className={[css.body, cssHasText].join(' ')}>
            <Link to={`/r/${roomID}`} className={css.body__back} />
            <h1 className={css.body__title}> {this.state.title} </h1>
            {this.state.text && <p className={css.body__text}> {this.state.text} </p>}
          </div>
          <div className={css.details}>
            <p className={css.details__comments}> 2 comments </p>
            <p className={css.details__time}>
              {this.state.timeAgo === 'a few seconds ago' ? 'just now' : this.state.timeAgo}
            </p>
            <button
              className={[css['details__likes-button'], cssIsLikedButton].join(' ')}
              onClick={this.likeHandler}
              disabled={!this.props.accountID}
            >
              <span className={[css['details__likes-span'], cssIsLikedSpan].join(' ')}>{this.state.likes} likes</span>
            </button>
          </div>
          <div className={css.actions}>
            {createdByMe && (
              <Fragment>
                <button className={css.actions__edit} onClick={() => this.modalHandler('editModal', true)}>
                  Edit
                </button>
                <button className={css.actions__delete} onClick={() => this.modalHandler('deleteModal', true)}>
                  Delete
                </button>
              </Fragment>
            )}
            <i className={css.actions__post} onClick={() => this.setState({ postCommentModal: true })} />
          </div>
        </div>
        <section>
          {this.state.loading && <Loader className={css.loader} />}
          {!this.state.loadingList &&
            this.state.comments
              .map((commentID, i) => (
                <div className={css.children} key={i}>
                  <Comment commentID={commentID} accountID={this.props.accountID} />
                </div>
              ))
              .reverse()}
        </section>
        {this.state.editModal.modal && (
          <Modal
            titleText="Edit Question"
            buttonText="Update"
            buttonLoader={this.state.editModal.loader}
            onSubmit={this.editQuestionHandler}
            onClose={() => this.modalHandler('editModal', false)}
          >
            <textarea
              placeholder="Additional information..."
              value={this.state.text}
              onChange={event =>
                this.setState({
                  text: event.target.value
                })
              }
              maxLength="20000"
            />
          </Modal>
        )}
        {this.state.postCommentModal && (
          <PostCommentModal
            newCommentHandler={this.newCommentHandler}
            onClose={() => this.setState({ postCommentModal: false })}
          />
        )}
        {this.state.deleteModal.modal && (
          <DeleteQuestionModal
            questionID={this.state.id}
            onClose={() =>
              this.setState({
                deleteModal: false
              })
            }
          />
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Question);
