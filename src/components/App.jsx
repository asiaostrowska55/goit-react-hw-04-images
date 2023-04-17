import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchGalleryImage, PER_PAGE } from './api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const response = await fetchGalleryImage(query);

      setImages(response.hits);

      setTimeout(async () => {
        setLoading(false);
      }, 200);
    };

    fetchImages();
  }, [query]);

  const getImages = async (query, page) => {
    setLoading(true);

    const response = await fetchGalleryImage(query, page);

    if (response.totalHits > 0) {
      let images = [];
      response.hits.forEach(el => {
        images.push({
          id: el.id,
          webformatURL: el.webformatURL,
          largeImageURL: el.largeImageURL,
          tags: el.tags,
        });
      });

      const totalPages = Math.ceil(response.totalHits / PER_PAGE);

      const previousImages = images;

      if (page !== 1) {
        previousImages.forEach(el => {
          images.forEach((photo, index, array) => {
            if (el.id === photo.id) {
              array.splice(index, 1);
            }
          });
        });
      }

      setImages(prevImages => {
        let renderGallery = [];

        page > 1
          ? (renderGallery = [...prevImages, ...images])
          : (renderGallery = [...images]);

        return renderGallery;
      });
      setQuery(query);
      setPage(page);
      setLoading(false);
      setTotalHits(response.totalHits);
      setTotalPages(totalPages);
    } else {
      setImages([]);
      setQuery('');
      setPage(1);
      setLoading(false);
      setTotalHits(0);
      setTotalPages(1);
    }
  };

  const openModal = largeImage => {
    setModal(true);
    setLargeImage(largeImage);
  };
  const closeModal = () => {
    setModal(false);
    setLargeImage('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar getImages={getImages} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={openModal} />
      {isModal && <Modal closeModal={closeModal} largeImage={largeImage} />}
      {totalHits > 0 && page < totalPages && page !== totalPages ? (
        <Button onClick={getImages} />
      ) : (
        ''
      )}
    </div>
  );
};
