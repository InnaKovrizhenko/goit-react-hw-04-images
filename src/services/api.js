import axios from 'axios';

const KEY = '34901171-040724bc8757a494d43e7296f';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export async function fetchPictures(pictureName, page) {
  const response = await axios.get(
    `?q=${pictureName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

return response.data;
}

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12