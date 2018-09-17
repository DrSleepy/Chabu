import React from 'react';

import css from './roomSettingsView.less';

const RoomSettingsView = props => (
  <div className={css.settings}>
    <div className={css.header}>
      <i className={css.header__back} />
      <h1 className={css.header__title}> Room Settings </h1>
    </div>
    <section className={css.section}>
      <h2 className={css.section__subheading}> Edit </h2>
      <p className={css.section__text}> Change the room info by editing the fields below. </p>
      <input className={css.section__input} type="text" placeholder="Title" />
      <input className={css.section__input} type="text" placeholder="Creator" />
    </section>
    <section className={css.section}>
      <h2 className={css.section__subheading}>Activity</h2>
      <p className={css.section__text}>Unlocking the room prevents any further messages from being added to the room. </p>
      <div className={css.buttons}>
        <button className={css.buttons__button}> Lock </button>
        <button className={[css.buttons__button, css['buttons__button--selected']].join(' ')}> Unlocked </button>
      </div>
    </section>
    <div className={css.footer}>
      <button className={css.footer__update}> Update </button>
    </div>
  </div>
);

export default RoomSettingsView;
