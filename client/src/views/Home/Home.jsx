import React from 'react';
import css from './home.less';

const Home = props => (
  <header>
    <div className={css.head}>
      <button className={css.head__join}> Join room </button>
      <button className={css.head__create}> Create room </button>
      <i className={css.head__settings}> </i>
    </div>
    <nav>
      <ul className={css.navigation}>
        <li> Joined Rooms </li>
        <li> My Questions Rooms </li>
        <li> Created Rooms </li>
      </ul>
    </nav>
  </header>
);

export default Home;
