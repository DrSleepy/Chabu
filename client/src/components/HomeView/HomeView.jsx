import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

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
    const response = await server.get(`/accounts/${list}`).catch(error => error.response.data);
    const result = response.data.data;
    let resultJSX = null;

    if (list === 'joined-rooms' || list === 'created-rooms') {
      resultJSX = result.map(room => <RoomItem title={room.title} id={room._id} creator={room.creator} key={room._id} />);
    }

    if (list === 'created-questions') {
      resultJSX = result.map(question => <QuestionItem title={question.title} key={question._id} />);
    }

    this.setState({ list: resultJSX });
  };

  render() {
    return (
      <Fragment>
        <div className={css.head}>
          <button className={css.head__join}> Join room </button>
          <button className={css.head__create}> Create room </button>
          <Link to="/settings" className={css.head__settings} />
        </div>
        <nav>
          <ul className={css.navigation}>
            <li className={css.navigation__item} onClick={() => this.getList('joined-rooms')}>
              Joined Rooms
            </li>
            <li className={css.navigation__item} onClick={() => this.getList('created-questions')}>
              My Questions
            </li>
            <li className={css.navigation__item} onClick={() => this.getList('created-rooms')}>
              Created Rooms
            </li>
          </ul>
        </nav>
        {this.state.list}
      </Fragment>
    );
  }
}

export default HomeView;
