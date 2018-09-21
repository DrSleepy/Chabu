import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import RoomInfo from '../RoomInfo/RoomInfo';
import QuestionItem from '../QuestionItem/QuestionItem';
import server from '../../axios';
import css from './roomView.less';

class RoomView extends Component {
  state = {
    room: {
      id: '',
      title: '',
      unlocked: '',
      creator: '',
      account: ''
    },
    questions: []
  };

  getRoom = async roomID => {
    const response = await server.get(`/rooms/${roomID}`).catch(error => error.response.data);
    const { id, title, unlocked, creator, account, questions } = response.data.data;

    this.setState({
      ...this.setState,
      room: { id, title, unlocked, creator, account },
      questions
    });
  };

  componentDidMount() {
    const roomID = window.location.pathname.replace('/r/', '');
    this.getRoom(roomID);
  }

  render() {
    return (
      <Fragment>
        <header className={css.head}>
          <div className={css.room}>
            <Link to="/" className={css.room__back} />
            <div className={css['room__room-info']}>
              <RoomInfo {...this.state.room} />
            </div>
            <i className={css.room__leave} />
            <Link to={'/settings'} className={css.room__settings} />
          </div>
          <div className={css.actions}>
            <button className={css.actions__submit}> Create Question </button>
            <button>
              <span className={[css['actions__item'], css['actions__item--search']].join(' ')}> Search </span>
            </button>
            <button>
              <span className={[css['actions__item'], css['actions__item--view']].join(' ')}> View </span>
            </button>
            <button>
              <span className={[css['actions__item'], css['actions__item--sort']].join(' ')}> Sort </span>
            </button>
          </div>
          <div className={css.filters}>
            <div className={css.filters__search}>
              <input className={css['filters__search--input']} type="text" placeholder="Search..." />
              <button className={css['filters__search--icon']} />
            </div>

            {/* <ul className={css.filters__list}>
              <li className={css.filters__list__item}> Today </li>
              <li className={css.filters__list__item}> Week </li>
              <li className={css.filters__list__item}> Month </li>
              <li className={css.filters__list__item}> All </li>
            </ul>

            <ul className={css.filters__list}>
              <li className={css.filters__list__item}> New </li>
              <li className={css.filters__list__item}> Old </li>
              <li className={css.filters__list__item}> Likes - Asc </li>
              <li className={css.filters__list__item}> Likes - Desc </li>
            </ul> */}
          </div>
        </header>
        <main>
          {this.state.questions.map((question, i) => (
            <QuestionItem {...question} key={i} />
          ))}
        </main>
      </Fragment>
    );
  }
}

export default RoomView;
