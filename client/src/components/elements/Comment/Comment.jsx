import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Modal from '../Modal/Modal';
import server from '../../../axios';
import css from './comment.less';

class Comment extends Component {
  state = {
    show: true,
    content: '',
    editModal: false,
    editLoader: false,
    deleteModal: false,
    deleteLoader: false
  };

  editCommentHandler = async () => {
    this.setState({ editLoader: true });

    const data = { text: this.state.content };
    await server.patch(`/comments/${this.props.id}`, data).catch(error => error.response);

    this.setState({ editModal: false, editLoader: false });
    this.props.reloadQuestion();
  };

  deleteCommentHandler = async () => {
    this.setState({ deleteLoader: true });
    await server.delete(`/comments/${this.props.id}`).catch(error => error.response);

    this.setState({ deleteLoader: false, deleteModal: false });
    this.props.reloadQuestion();
  };

  componentWillMount = () => {
    this.setState({ content: this.props.text });
  };

  render() {
    const cssIsCollapsed = !this.state.show ? css.isCollapsed : '';
    const cssIsCollapsedComment = !this.state.show ? css.isCollapsedComment : '';

    return (
      <div className={[css.comment, cssIsCollapsedComment].join(' ')}>
        <header className={css.header} onClick={() => this.setState({ show: !this.state.show })}>
          <p className={css.header__username}> {this.props.showUsername ? this.props.username : 'Anonymous'} </p>
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
                <button className={css.footer__edit} onClick={() => this.setState({ editModal: true })}>
                  Edit
                </button>
                <button className={css.footer__delete} onClick={() => this.setState({ deleteModal: true })}>
                  Delete
                </button>
                <button className={css.footer__reply}> Reply </button>
              </footer>
            )}
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
      </div>
    );
  }
}

export default withRouter(Comment);
