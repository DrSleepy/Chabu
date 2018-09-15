import React, { Fragment } from 'react';

import RoomItem from '../../components/RoomItem/RoomItem';
import QuestionItem from '../../components/QuestionItem/QuestionItem';
import css from './home.less';

const Home = props => (
  <Fragment>
    <header>
      <div className={css.head}>
        <button className={css.head__join}> Join room </button>
        <button className={css.head__create}> Create room </button>
        <i className={css.head__settings}> </i>
      </div>
      <nav>
        <ul className={css.navigation}>
          <li className={css.navigation__item}> Joined Rooms </li>
          <li className={css.navigation__item}> My Questions </li>
          <li className={css.navigation__item}> Created Rooms </li>
        </ul>
      </nav>
    </header>
    <RoomItem />
    <RoomItem />
    <QuestionItem />
    <QuestionItem />
  </Fragment>
);

export default Home;
