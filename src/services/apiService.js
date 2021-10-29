/* import movieId from '../views/MovieDetailsPage'; */

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'dc1ac22b6d897f0eb3cf1fd1c0f34665';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopularFilms() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${KEY}`,
  );
}

export function fetchFilmById(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US&include_image_language=en%2C%20null`,
  );
}

export function fetchCast(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`,
  );
}

export function fetchRewiew(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
  );
}

/* export function fetchSearchFilms() {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false`,
  );
} */

export function fetchSearchFilms(searchValue) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${searchValue}`,
  );
}
