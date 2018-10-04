import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../../../Portal';
import ButtonWithLoader from '../ButtonWithLoader/ButtonWithLoader';
import css from './modal.less';

const Modal = props => {
  const isDanger = props.type === 'danger';

  return (
    <Portal>
      <div className={css.background} onClick={props.onClose}>
        <div className={css.modal} onClick={event => event.stopPropagation()}>
          <header className={css.modal__header}>
            <p className={css.modal__title} style={{ color: isDanger && '#ef4573' }}>
              {props.titleText}
            </p>
            <i className={css.modal__close} onClick={props.onClose} />
          </header>

          {props.children}

          <div className={css.actions}>
            <button className={css.actions__secondary} onClick={props.onClose}>
              Cancel
            </button>
            <ButtonWithLoader
              className={css.actions__primary}
              text={props.buttonText}
              buttonType={!isDanger ? 'primary' : 'primary--danger'}
              spinnerColor="#fff"
              onClick={props.onSubmit}
              loading={props.buttonLoader}
            />
          </div>
        </div>
      </div>
    </Portal>
  );
};
Modal.propTypes = {
  titleText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLoader: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
export default Modal;
