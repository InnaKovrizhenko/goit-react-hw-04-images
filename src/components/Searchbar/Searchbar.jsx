import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ( {onSubmit} ) => {
const [inputText, setinputText] = useState('');

 const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim() === '') {
      toast.info('Please enter any request');
      return;
    }
    onSubmit(inputText);
    setinputText('');
  };

  const handleInput = (event) => {
    setinputText(event.currentTarget.value.toLowerCase());
  };

    return (
      <div>
        <SearchBar>
          <SearchForm onSubmit={handleSubmit}>
            <SearchButton type="submit">
              <ButtonLabel>Search</ButtonLabel>
            </SearchButton>

            <SearchInput
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={handleInput}
            />
          </SearchForm>  
        </SearchBar>
      </div>
    );
  }

  Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


