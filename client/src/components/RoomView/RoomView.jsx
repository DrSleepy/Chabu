import React, { Fragment } from 'react';

import RoomInfo from '../RoomInfo/RoomInfo';
import QuestionItem from '../QuestionItem/QuestionItem';
import css from './roomView.less';

const RoomView = props => (
  <Fragment>
    <header>
      <div className={css['room']}>
        <i className={css['room__back']} />
        <div className={css['room__room-info']}>
          <RoomInfo />
        </div>
        <i className={css['room__leave']} />
        <i className={css['room__settings']} />
      </div>
      <div className={css['actions']}>
        <button className={css['actions__submit']}> Create Question </button>
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
    </header>
    <main>
      <QuestionItem />
      <QuestionItem />
      <QuestionItem />
    </main>
  </Fragment>
);

export default RoomView;
