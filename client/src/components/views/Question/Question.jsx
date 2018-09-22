import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Comment from '../../elements/Comment/Comment';
import css from './question.less';

const Question = props => (
  <Fragment>
    <div className={css.question}>
      <div className={css.body}>
        <Link to="/r/r" className={css.body__back} />
        <h1 className={css.body__title}>What exactly are pipelines in the context of Computer Science?</h1>
        <p className={css.body__text}>
          What exactly are pipelines in the context of Computer Science? Secondly, how does this fit into the exam? Please
          abide by the rules give to you and your kids. Do not break the law, mate. Warned you. What exactly are pipelines in
          <br />
          <br />
          the context of Computer Science? Secondly, how does this fit into the exam? Please abide by the rules give to you
          and your kids. Do not break the law, mate. Warned you. What exactly are pipelines in the context of Computer
          Science? Secondly, how does this fit into the exam? Please abide by the rules give to you and your kids. Do not
          break the law, mate. Warned you.
        </p>
      </div>
      <div className={css.details}>
        <p className={css.details__comments}> 2 comments </p>
        <p className={css.details__time}> 13 hours ago </p>
        <button className={css['details__likes--button']}>
          <span className={css['details__likes--span']}> 2 likes </span>
        </button>
      </div>
      <div className={css.actions}>
        <button className={css.actions__edit}> Edit </button>
        <button className={css.actions__delete}> Delete </button>
      </div>
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

export default Question;
