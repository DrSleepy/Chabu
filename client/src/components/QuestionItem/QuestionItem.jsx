import React from 'react';

import css from './questionItem.less';

const QuestionItem = props => (
  <div className={css.question}>
    <i className={css.thumb} />
    <h2 className={css.title}>What exactly are pipelines in the context of Computer Science?</h2>
    <p className={css.likes}> 1 likes </p>
    <p className={css.comments}> 3 comments </p>
    <p className={css.time}> 4 hours ago </p>
    <i className={css.delete} />
  </div>
);

export default QuestionItem;
