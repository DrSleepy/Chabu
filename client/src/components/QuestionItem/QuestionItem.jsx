import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import css from './questionItem.less';

class QuestionItem extends Component {
  state = {
    liked: false,
    likes: 0
  };

  likeHandler = () => {
    this.setState({ liked: !this.state.liked });
    this.state.liked ? this.setState({ likes: this.state.likes - 1 }) : this.setState({ likes: this.state.likes + 1 });
  };

  render() {
    const cssIsLiked = this.state.liked ? css['thumb--true'] : css['thumb--false'];

    return (
      <div className={css.question}>
        <i className={[css.thumb, cssIsLiked].join(' ')} onClick={this.likeHandler} />
        <h2 className={css.title}>
          <Link to="/q/q">What exactly are pipelines in the context of Computer Science?</Link>
        </h2>
        <p className={css.likes}> {this.state.likes} likes </p>
        <p className={css.comments}> 3 comments </p>
        <p className={css.time}> 4 hours ago </p>
        <i className={css.delete} />
      </div>
    );
  }
}

export default QuestionItem;
