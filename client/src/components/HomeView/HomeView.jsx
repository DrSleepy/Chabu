import React, { Fragment, Component } from 'react';

import RoomItem from '../RoomItem/RoomItem';
import QuestionItem from '../QuestionItem/QuestionItem';
import css from './homeView.less';

class HomeView extends Component {
  state = {
    component: <RoomItem />
  };

  switchComponent = component => {
    this.setState({ component });
  };

  render() {
    return (
      <Fragment>
        <div className={css.head}>
          <button className={css.head__join}> Join room </button>
          <button className={css.head__create}> Create room </button>
          <i className={css.head__settings}> </i>
        </div>
        <nav>
          <ul className={css.navigation}>
            <li className={css.navigation__item} onClick={() => this.switchComponent(<RoomItem />)}>
              Joined Rooms
            </li>
            <li className={css.navigation__item} onClick={() => this.switchComponent(<QuestionItem />)}>
              My Questions
            </li>
            <li className={css.navigation__item} onClick={() => this.switchComponent(<RoomItem />)}>
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
