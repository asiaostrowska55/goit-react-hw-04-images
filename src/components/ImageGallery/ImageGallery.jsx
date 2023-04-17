import css from './ImageGallery.module.css';
import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItems/ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ largeImageURL, webformatURL, id, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: propTypes.array,
  openModal: propTypes.func,
};

export default ImageGallery;
