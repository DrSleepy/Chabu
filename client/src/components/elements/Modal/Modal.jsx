import React from 'react';

import Portal from '../../../Portal';
import css from './modal.less';

const Modal = props => {
  const dangerBtn = props.theme === 'danger' ? css['danger-btn'] : null;
  const dangerText = props.theme === 'danger' ? css['danger-text'] : null;

  return (
    <Portal>
      <div className={css.background}>
        <div className={css.modal}>
          <header className={css.modal__header}>
            <p className={[css.modal__title, dangerText].join(' ')}> {props.title} </p>
            <i className={css.modal__close} onClick={props.close} />
          </header>

          {props.children}
          
          <div className={css.actions}>
            <button className={css.actions__secondary} onClick={props.close}> Cancel </button>
            <button className={[css.actions__primary, dangerBtn].join(' ')}> {props.primaryText} </button>
          </div>
          <div className={css.modal__content} />
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
