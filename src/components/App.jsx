import { Container } from './App.styled';
import { useState, useEffect } from 'react';
import { fetchPictures } from '../services/api'
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [inputPictureName, setInputPictureName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedPicture, setSelectedPicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect (() => {
    if (inputPictureName) {
      setIsLoading(true);
      fetchPictures(inputPictureName, page)
    .then((data) => {
      setPictures(prevPictures => {
        return [...prevPictures, ...data.hits];
      }
      );
    })
    .catch(error => console.log(error))
    .finally(() => {
      setIsLoading(false);
    });
    console.log(page);
}
}, [inputPictureName, page]);

  const getSearchbarInputPictureName = (inputText) => {
    setInputPictureName(inputText);
    setPictures([]);
    setPage(1);
  };

  const openModal = (link) => {
    setSelectedPicture(link);
  };

  const closeModal = () => {
    setSelectedPicture('');
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

    return (
      <Container>
        <Searchbar onSubmit={getSearchbarInputPictureName} />
        {pictures.length !== 0 && (
          <ImageGallery pictures={pictures} openModal={openModal}/>)}
        {selectedPicture && (
          <Modal onCloseModal={closeModal} showPicture={selectedPicture}/>
        )}
        {pictures.length !== 0 && !isLoading && <Button handleLoadMore={onLoadMore} />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2000} />
        </Container> 
    );
  }

