import axios from 'axios';
export const API_KEY = '33257268-27ad9fcecc17d6e2546f4b9dc';
export const PER_PAGE = 12;

export const fetchGalleryImage = async (query, page) => {
  const response = await axios({
    method: 'get',
    url: 'https://pixabay.com/api/',
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizonatal',
      safesearch: true,
      per_page: PER_PAGE,
      page: page,
    },
  });
  return response.data;
};
