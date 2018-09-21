import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import mapStateToProps from '../../../store/state';
import mapDispatchToProps from '../../../store/dispatch';
import server from '../../../axios';
import css from './questionItem.less';

class QuestionItem extends Component {
  state = {
    liked: false,
    likes: 0
  };

  likeHandler = async () => {
    this.setState({ liked: !this.state.liked });
    this.state.liked ? this.setState({ likes: this.state.likes - 1 }) : this.setState({ likes: this.state.likes + 1 });

    const response = await server.patch(`/questions/${this.props.id}/like`).catch(error => error.response.data);
    const updatedLikedQuestions = response.data.data.likedQuestions;
    this.props.updateLikedQuestions(updatedLikedQuestions); // THIS SHIT RIGHT HERE REFRESHES PAGE. FIX
  };

  appendPropsToState() {
    const liked = this.props.likedQuestions.includes(this.props.id);
    this.setState({ liked, likes: this.props.likes });
  }

  componentWillMount() {
    this.appendPropsToState();
  }

  render() {
    const cssIsLiked = this.state.liked ? css['thumb--true'] : css['thumb--false'];

    return (
      <div className={css.question}>
        <i className={[css.thumb, cssIsLiked].join(' ')} onClick={this.likeHandler} />
        <h2 className={css.title}>
          <Link to="/q/q"> {this.props.title} </Link>
        </h2>
        <p className={css.likes}> {this.state.likes} likes </p>
        <p className={css.comments}> {this.props.comments.length} comments </p>
        <p className={css.time}> {this.props.timeAgo} </p>
        <i className={css.delete} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionItem);
