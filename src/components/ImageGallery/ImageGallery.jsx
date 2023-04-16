import { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItems/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;
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
  }
}

export default ImageGallery;
