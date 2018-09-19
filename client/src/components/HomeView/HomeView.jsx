import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import RoomItem from '../RoomItem/RoomItem';
import QuestionItem from '../QuestionItem/QuestionItem';
import css from './homeView.less';
import server from '../../axios';

class HomeView extends Component {
  state = {
    component: <RoomItem />
  };

  componentWillMount() {
    server
      .get('accounts')
      .then(x => {
        console.log('ooo', x);
      })
      .catch(error => {
        console.log(error.response);
      });

    // server
    //   .post('login', {
    //     username: 'bobby',
    //     password: 'abc123456'
    //   })
    //   .then(x => {
    //     console.log('yay', x);
    //   })
    //   .catch(error => {
    //     console.log(error.response.data);
    //   });

    // fetch('http://localhost:3333/accounts/', { method: 'GET', credentials: 'include' }) // or 'PUT'
    //   .then(res => res.json())
    //   .then(x => {
    //     console.log('eeee', x);
    //   });
  }

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
            <li className={css.navigation__item} onClick={() => this.setState({ component: <RoomItem /> })}>
              Joined Rooms
            </li>
            <li className={css.navigation__item} onClick={() => this.setState({ component: <QuestionItem /> })}>
              My Questions
            </li>
            <li className={css.navigation__item} onClick={() => this.setState({ component: <RoomItem /> })}>
              Created Rooms
            </li>
          </ul>
        </nav>
        {this.state.component}
      </Fragment>
    );
  }
}

export default HomeView;
