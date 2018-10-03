import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../../../Portal';
import css from './popup.less';

const Popup = props => (
  <Portal>
    <div className={css.container}>
      <main className={css.main}>
        <p> Room Joined </p>
        {props.children}
      </main>
    </div>
  </Portal>
);

Popup.propTypes = {
  text: PropTypes.string.isRequired
};

export default Popup;
