import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../../../Portal';
import css from './modal.less';

const Modal = props => (
  <Portal>
    <div className={css.background} onClick={props.close}>
      <div className={css.modal} onClick={event => event.stopPropagation()}>
        <header className={css.modal__header}>
          <p className={css.modal__title}> {props.titleText} </p>
          <i className={css.modal__close} onClick={props.close} />
        </header>

        {props.children}
      </div>
    </div>
  </Portal>
);

Modal.propTypes = {
  titleText: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};
export default Modal;
