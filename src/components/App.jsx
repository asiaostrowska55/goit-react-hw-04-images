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

  const handleSubmit = async event => {
    event.preventDefault();
    const inputValue = event.target.inputQuery.value;
    setQuery(inputValue.trim().toLowerCase());
    try {
      setLoading(true);

      const response = await fetchGalleryImage(inputValue, 1);

      setImages(response.hits);
      setTotalHits(response.totalHits);
      setTotalPages(Math.ceil(response.totalHits / PER_PAGE));

      if (response.totalHits > PER_PAGE && query !== inputValue) {
        setPage(2);
      }
    } catch (error) {
      console.log('Error!', error);
    } finally {
      setLoading(false);
    }
  };

  const getImages = async e => {
    e.preventDefault();
    try {
      const response = await fetchGalleryImage(query, page);
      setImages(response.hits);
      setTotalHits(response.totalHits);
      setTotalPages(Math.ceil(response.totalHits / PER_PAGE));

      if (response.hits.length > 0) {
        setImages([...images, ...response.hits]);
        setLoading(false);
        setPage(page + 1);

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
      }
    } catch (error) {
      console.log('Error!', error);
    } finally {
      setLoading(false);
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
      <Searchbar handleSubmit={handleSubmit} query={query} page={page} />
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
