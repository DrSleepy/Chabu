import React from 'react';

import css from './comment.less';

const Home = props => (
  <div className={css['comment']}>
    <header className={css['header']}>
      <p className={css['header__username']}> Steve </p>
      <p className={css['header__time']}> 3 hours ago </p>
      <i className={css['header__arrow']} />
    </header>
    <p className={css['text']}>
      What exactly are pipelines in the context of Computer Science? Secondly, how does this fit into the exam? Please abide
      by the rules give to you and your kids. Do not break the law, mate. Warned you. What exactly are pipelines in the
      context of Computer Science? Secondly, how does this fit into the exam? Please abide by the rules give to you and your
      kids.
    </p>
    <footer className={css['footer']}>
      <button className={css['footer__reply']}> Reply </button>
      <button className={css['footer__edit']}> Edit </button>
      <button className={css['footer__delete']}> Delete </button>
    </footer>
  </div>
);

export default Home;
