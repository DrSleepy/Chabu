import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import mapStateToProps from '../../../store/state';
import Comment from '../../elements/Comment/Comment';
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
    comments: []
  };

  likeHandler = async () => {
    this.setState({ liked: !this.state.liked });
    this.state.liked ? this.setState({ likes: this.state.likes - 1 }) : this.setState({ likes: this.state.likes + 1 });
    await server.patch(`/questions/${this.state.id}/like`);
  };

  getAndSetQuestion = async questionID => {
    this.setState({ loading: true });

    const response = await server.get(`/questions/${questionID}`).catch(error => error.response.data);

    const liked = response.data.data.likedBy.includes(this.props.accountID);

    this.setState({
      loading: false,
      likes: response.data.data.likedBy.length,
      liked: liked,
      ...response.data.data
    });
  };

  componentWillMount = () => {
    const urlPath = window.location.pathname;
    const indexOflastSlash = window.location.pathname.lastIndexOf('/') + 1;
    const questionID = urlPath.substring(indexOflastSlash);

    this.getAndSetQuestion(questionID);
  };

  render() {
    const createdByMe = this.props.accountID === this.state.account;
    const cssIsLikedButton = this.state.liked && css['details__likes-button--liked'];
    const cssIsLikedSpan = this.state.liked && css['details__likes-span--liked'];
    const isDisabled = this.props.accountID ? false : true;

    return (
      <Fragment>
        <div className={css.question}>
          <div className={css.body}>
            <Link to="/r/r" className={css.body__back} />
            <h1 className={css.body__title}> {this.state.title} </h1>
            <p className={css.body__text}> {this.state.text} </p>
          </div>
          <div className={css.details}>
            <p className={css.details__comments}> 2 comments </p>
            <p className={css.details__time}> {this.state.timeAgo} </p>
            <button
              className={[css['details__likes-button'], cssIsLikedButton].join(' ')}
              onClick={this.likeHandler}
              disabled={isDisabled}
            >
              <span className={[css['details__likes-span'], cssIsLikedSpan].join(' ')}>{this.state.likes} likes</span>
            </button>
          </div>
          {createdByMe && (
            <div className={css.actions}>
              <button className={css.actions__edit}> Edit </button>
              <button className={css.actions__delete}> Delete </button>
            </div>
          )}
        </div>
        <section>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </section>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Question);
