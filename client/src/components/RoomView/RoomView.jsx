import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import RoomInfo from '../RoomInfo/RoomInfo';
import QuestionItem from '../QuestionItem/QuestionItem';
import css from './roomView.less';

const showSearch = () => {
  console.log('lool');
};

const RoomView = props => (
  <Fragment>
    <header className={css.head}>
      <div className={css.room}>
        <Link to="/" className={css.room__back} />
        <div className={css['room__room-info']}>
          <RoomInfo />
        </div>
        <i className={css.room__leave} />
        <Link to={'/settings'} className={css.room__settings} />
      </div>
      <div className={css.actions}>
        <button className={css.actions__submit}> Create Question </button>
        <button onClick={showSearch}>
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

        <ul className={css.filters__list}>
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
        </ul>
      </div>
    </header>
    <main>
      <QuestionItem />
      <QuestionItem />
      <QuestionItem />
    </main>
  </Fragment>
);

export default RoomView;
