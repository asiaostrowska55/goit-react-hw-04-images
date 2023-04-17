import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ closeModal, largeImage, tags }) => {
  const handleClose = event => {
    if (event.code === 'Escape') {
      return closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleClose);

    return () => {
      window.removeEventListener('keyup', handleClose);
    };
  }, [closeModal]);

  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={largeImage} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
  tags: PropTypes.string,
};

export default Modal;
