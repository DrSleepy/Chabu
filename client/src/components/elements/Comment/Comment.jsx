import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import PostCommentModal from '../PostCommentModal/PostCommentModal';
import server from '../../../axios';
import css from './comment.less';
import mapStateToProps from '../../../store/state';

class Comment extends Component {
  state = {
    id: '',
    show: true,
    content: '',
    children: [],
    editModal: false,
    editLoader: false,
    deleteModal: false,
    deleteLoader: false,
    postCommentModal: false
  };

  newCommentHandler = newComment => {
    this.setState({ children: [...this.state.children, newComment] });
  };

  editCommentHandler = async () => {
    this.setState({ editLoader: true });

    const data = { text: this.state.content };
    await server.patch(`/comments/${this.props.id}`, data).catch(error => error.response);

    this.setState({ editModal: false, editLoader: false });
  };

  deleteCommentHandler = async () => {
    this.setState({ deleteLoader: true });
    await server.delete(`/comments/${this.props.id}`).catch(error => error.response);

    this.setState({ deleteLoader: false, deleteModal: false });
  };

  componentWillMount = async () => {
    const comment = await server.get(`/comments/${this.props.id}`).catch(error => error.response);
    this.setState({ id: comment.data.data._id, content: this.props.text, children: comment.data.data.comments });
  };

  render() {
    const cssIsCollapsed = !this.state.show ? css.isCollapsed : '';
    const cssIsCollapsedComment = !this.state.show ? css.isCollapsedComment : '';

    const isMyComment = this.props.accountID === this.props.account._id;

    return (
      <div className={[css.comment, cssIsCollapsedComment].join(' ')}>
        <header className={css.header} onClick={() => this.setState({ show: !this.state.show })}>
          <p className={css.header__username}> {this.props.showUsername ? this.props.account.username : 'Anonymous'} </p>
          <p className={css.header__time}>
            {this.props.timeAgo} <span className={css.header__edited}> {this.props.edited && '(edited)'} </span>
          </p>
          <i className={[css.header__arrow, cssIsCollapsed].join(' ')} />
        </header>

        {this.state.show && (
          <Fragment>
            <p className={css.text}>{!this.props.deleted ? this.props.text : '[deleted]'}</p>
            {!this.props.deleted && (
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

            {this.state.children
              .map((comment, i) => (
                <div className={css.children} key={i}>
                  <Comment {...comment} />
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
              value={this.state.content}
              onChange={event => this.setState({ content: event.target.value })}
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
            commentID={this.state.id}
            onClose={() => this.setState({ postCommentModal: false })}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Comment));
