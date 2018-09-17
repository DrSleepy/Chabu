import React from 'react';
import { Link } from 'react-router-dom';

import css from './questionItem.less';

const QuestionItem = props => (
  <div className={css.question}>
    <i className={css.thumb} />
    <h2 className={css.title}>
      <Link to="/q/q">What exactly are pipelines in the context of Computer Science?</Link>
    </h2>
    <p className={css.likes}> 1 likes </p>
    <p className={css.comments}> 3 comments </p>
    <p className={css.time}> 4 hours ago </p>
    <i className={css.delete} />
  </div>
);

export default QuestionItem;
