import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  const { id, largeImageURL, webformatURL, tags, openModal } = props;

  return (
    <li className={css.galleryItem} key={id}>
      <img
        key={id}
        name={largeImageURL}
        loading="lazy"
        className={css.image}
        src={webformatURL}
        alt={tags}
        onClick={() => openModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tags: PropTypes.string,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;
