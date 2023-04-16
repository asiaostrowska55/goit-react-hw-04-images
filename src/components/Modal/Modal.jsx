import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keyup', this.handleClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleClose);
  }
  handleClose = event => {
    if (event.code === 'Escape') {
      return this.props.closeModal();
    }
  };

  render() {
    const { closeModal, largeImage, tags } = this.props;

    return (
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
          <img src={largeImage} alt={tags} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
  tags: PropTypes.string,
};

export default Modal;
