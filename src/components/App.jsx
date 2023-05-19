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
  const [ , setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ , setShowLoadMoreButton] = useState(false);

  
  useEffect (() => {
    if (inputPictureName) {
      getPictures(inputPictureName);
    }
  }, [inputPictureName])

  const getSearchbarInputPictureName = (inputText) => {
    setInputPictureName(inputText);
  };

  const getPictures = (pictureName) => {
    fetchPictures(pictureName)
    .then(data => {
      setPictures(data.hits)
    })
    .catch(error => console.log(error))
  }

  const openModal = (link) => {
    setSelectedPicture(link);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPicture('');
    setIsModalOpen(false);
  };

  const onLoadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newPictures = await fetchPictures(inputPictureName, nextPage);
    setPictures([...pictures, ...newPictures.hits]);
    setPage(nextPage);
    setShowLoadMoreButton(newPictures.total > pictures.length + newPictures.hits.length);
    setIsLoading(false);
  };

    return (
      <Container>
        <Searchbar onSubmit={getSearchbarInputPictureName} />
        {pictures.length !== 0 && (
          <ImageGallery
          pictures={pictures}
          openModal={openModal}
          />
        )}
        {selectedPicture && (
          <Modal onCloseModal={closeModal} showPicture={selectedPicture}/>
        )}
        {pictures.length !== 0 && (
        <Button
        handleLoadMore={onLoadMore}
      />
        )}
        {isLoading && (
          <Loader />
        )}
        <ToastContainer autoClose={2000} />
      </Container>
      
    );
  }

