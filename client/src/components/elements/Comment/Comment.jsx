import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Modal from '../Modal/Modal';
import PostCommentModal from '../PostCommentModal/PostCommentModal';
import server from '../../../axios';
import css from './comment.less';

class Comment extends Component {
  state = {
    comment: {
      id: '',
      text: '',
      comments: [],
      edited: false,
      deleted: false,
      showUsername: '',
      account: { _id: '', username: '' }
    },
    loading: false,
    show: true,
    editModal: false,
    editLoader: false,
    deleteModal: false,
    deleteLoader: false,
    postCommentModal: false
  };

  newCommentHandler = newComment => {
    this.setState({ comment: { ...this.state.comment, comments: [...this.state.comment.comments, newComment.id] } });
  };

  editCommentHandler = async () => {
    this.setState({ editLoader: true });

    const data = { text: this.state.comment.text };
    const response = await server.patch(`/comments/${this.state.comment.id}`, data).catch(error => error.response);

    this.setState({
      comment: { ...this.state.comment, text: response.data.data.text },
      editModal: false,
      editLoader: false
    });
  };

  deleteCommentHandler = async () => {
    this.setState({ deleteLoader: true });
    await server.delete(`/comments/${this.state.comment.id}`).catch(error => error.response);

    this.setState({
      comment: { ...this.state.comment, deleted: true },
      deleteLoader: false,
      deleteModal: false
    });
  };

  setupCommentHandler = async () => {
    const response = await server.get(`/comments/${this.props.commentID}`).catch(error => error.response);
    const { id, text, showUsername, edited, deleted, comments, account } = response.data.data;
    this.setState({ comment: { id, text, showUsername, edited, deleted, comments, account } });
  };

  componentWillMount = () => {
    this.setupCommentHandler();
  };

  render() {
    const cssIsCollapsed = !this.state.show ? css.isCollapsed : '';
    const cssIsCollapsedComment = !this.state.show ? css.isCollapsedComment : '';
    const isMyComment = this.props.accountID === this.state.comment.account._id;

    return (
      <div className={[css.comment, cssIsCollapsedComment].join(' ')}>
        <header className={css.header} onClick={() => this.setState({ show: !this.state.show })}>
          <p className={css.header__username}> {this.state.showUsername ? this.state.account.username : 'Anonymous'} </p>
          <p className={css.header__time}>
            {this.state.timeAgo} <span className={css.header__edited}> {this.state.edited && '(edited)'} </span>
          </p>
          <i className={[css.header__arrow, cssIsCollapsed].join(' ')} />
        </header>

        {this.state.show && (
          <Fragment>
            <p className={css.text}>{!this.state.comment.deleted ? this.state.comment.text : '[deleted]'}</p>
            {!this.state.comment.deleted && (
              <footer className={css.footer}>
                {isMyComment && (
                  <Fragment>
                    <button className={css.footer__edit} onClick={() => this.setState({ editModal: true })}>
                      Edit
                    </button>
                    <button className={css.footer__delete} onClick={() => this.setState({ deleteModal: true })}>
                      Delete
                    </button>
                  </Fragment>
                )}
                <button className={css.footer__reply} onClick={() => this.setState({ postCommentModal: true })}>
                  Reply
                </button>
              </footer>
            )}

            {this.state.comment.comments
              .map((commentID, i) => (
                <div className={css.children} key={i}>
                  <Comment commentID={commentID} accountID={this.props.accountID} />
                </div>
              ))
              .reverse()}
          </Fragment>
        )}

        {this.state.editModal && (
          <Modal
            titleText="Edit Comment"
            buttonText="Update"
            buttonLoader={this.state.editLoader}
            onSubmit={this.editCommentHandler}
            onClose={() => this.setState({ editModal: false })}
          >
            <textarea
              placeholder="Type comment here..."
              value={this.state.comment.text}
              onChange={event => this.setState({ comment: { ...this.state.comment, text: event.target.value } })}
              maxLength="20000"
            />
          </Modal>
        )}

        {this.state.deleteModal && (
          <Modal
            type="danger"
            titleText="Delete Comment"
            buttonText="Delete"
            buttonLoader={this.state.deleteLoader}
            onSubmit={this.deleteCommentHandler}
            onClose={() => this.setState({ deleteModal: false })}
          >
            <p> Confirm your choice to delete </p>
          </Modal>
        )}

        {this.state.postCommentModal && (
          <PostCommentModal
            newCommentHandler={this.newCommentHandler}
            commentID={this.state.comment.id}
            onClose={() => this.setState({ postCommentModal: false })}
          />
        )}
      </div>
    );
  }
}

export default withRouter(Comment);
