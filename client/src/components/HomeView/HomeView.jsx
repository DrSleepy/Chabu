import React, { Fragment, Component } from 'react';
import { Link, Route, NavLink, Switch, Redirect } from 'react-router-dom';

import RoomItem from '../RoomItem/RoomItem';
import QuestionItem from '../QuestionItem/QuestionItem';
import css from './homeView.less';
import server from '../../axios';

class HomeView extends Component {
  state = {
    list: null
  };

  componentWillMount() {
    this.getList('joined-rooms');
  }

  getList = async list => {
    this.setState({ loading: true });

    const response = await server.get(`/accounts/${list}`).catch(error => error.response.data);
    const result = response.data.data;
    let resultJSX;

    if (list === 'joined-rooms' || list === 'created-rooms') {
      resultJSX = result.map(room => <RoomItem title={room.title} id={room._id} creator={room.creator} key={room._id} />);
    }

    if (list === 'created-questions') {
      resultJSX = result.map(question => <QuestionItem title={question.title} key={question._id} />);
    }

    this.setState({ loading: false, list: resultJSX });
  };

  render() {
    return (
      <Fragment>
        <div className={css.head}>
          <button className={css.head__join}> Join room </button>
          <button className={css.head__create}> Create room </button>
          <Link to="/settings" className={css.head__settings} />
        </div>
        <nav className={css.navigation}>
          <NavLink
            className={css.navigation__item}
            to="/joined-rooms"
            onClick={() => this.getList('joined-rooms')}
            activeClassName={css.active}
          >
            Joined Rooms
          </NavLink>
          <NavLink
            className={css.navigation__item}
            to="/created-questions"
            onClick={() => this.getList('created-questions')}
            activeClassName={css.active}
          >
            My Questions
          </NavLink>
          <NavLink
            className={css.navigation__item}
            to="/created-rooms"
            onClick={() => this.getList('created-rooms')}
            activeClassName={css.active}
          >
            Created Rooms
          </NavLink>
        </nav>

        <Route exact path="/(joined-rooms|created-questions|created-rooms)/" component={() => this.state.list} />
        <Redirect from="/" to="/joined-rooms" />
      </Fragment>
    );
  }
}

export default HomeView;
