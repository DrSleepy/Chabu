import React, { Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';

import RoomItem from '../RoomItem/RoomItem';
import QuestionItem from '../QuestionItem/QuestionItem';
import css from './homeView.less';

const HomeView = props => (
  <Fragment>
    <div className={css.head}>
      <button className={css.head__join}> Join room </button>
      <button className={css.head__create}> Create room </button>
      <i className={css.head__settings}> </i>
    </div>
    <nav>
      <ul className={css.navigation}>
        <li>
          <NavLink to="/joined" className={css.navigation__item} activeClassName={css.active}>
            Joined Rooms
          </NavLink>
        </li>
        <li>
          <NavLink to="/questions" className={css.navigation__item} activeClassName={css.active}>
            My Questions
          </NavLink>
        </li>
        <li>
          <NavLink to="/created" className={css.navigation__item} activeClassName={css.active}>
            Created Rooms
          </NavLink>
        </li>
      </ul>
    </nav>
    <Route exact path="/joined" render={RoomItem} />
    <Route exact path="/questions" render={QuestionItem} />
    <Route exact path="/created" render={RoomItem} />
  </Fragment>
);

export default HomeView;
