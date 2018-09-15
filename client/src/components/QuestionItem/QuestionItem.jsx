import React from 'react';

import css from './questionItem.less';

const QuestionItem = props => (
  <div className={css.question}>
    <h2 className={css.question__title}> Computer Science - Pipelines</h2>
    <i className={css.question__unlocked} />
    <p className={css.question__creator}> Dr Pushpa King </p>
    <p className={css.question__code}> Exd3D4F </p>
    <i className={css.question__arrow} />
  </div>
);

export default QuestionItem;
