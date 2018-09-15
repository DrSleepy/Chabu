import React from 'react';

import css from './questionItem.less';

const QuestionItem = props => (
  <div className={css.question}>
    <i className={css.question__thumb} />
    <h2 className={css.question__title}>
      What exactly are pipelines in the context of Computer Science? Secondly, how does this fit into the exam?
    </h2>
    <p className={css.question__likes}> 1 likes </p>
    <p className={css.question__comments}> 3 comments </p>
    <p className={css.question__time}> 4 hours ago </p>
    <button className={css.question__delete}> Delete </button>
    <i className={css.question__bin} />
  </div>
);

export default QuestionItem;
