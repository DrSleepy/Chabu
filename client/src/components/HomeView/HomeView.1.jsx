import React, { Fragment } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

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
          <NavLink to="/rooms" className={css.navigation__item} activeClassName={css.active}>
            My Rooms
          </NavLink>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route exact path="/joined" component={RoomItem} />
      <Route exact path="/questions" component={QuestionItem} />
      <Route exact path="/rooms" component={RoomItem} />
      <Route path="/" component={RoomItem} />
    </Switch>
  </Fragment>
);

export default HomeView;
