import { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import * as filmsAPI from '../services/apiService';
import Casts from './Cast';
import Reviews from './Reviews';

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  /* console.log('detailsView:', location); */
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [film, setFilms] = useState([]);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    filmsAPI.fetchFilmById(movieId).then(setFilms);
  }, [movieId]);

  /* let filmsAll = films.results; */
  /* console.log(film); */
  /* let genres = film.genres; */
  /* console.log(genres); */

  useEffect(() => {
    filmsAPI.fetchCast(movieId).then(setActors);
  }, [movieId]);
  /* console.log(actors); */

  useEffect(() => {
    filmsAPI.fetchRewiew(movieId).then(setReviews);
  }, [movieId]);
  /* console.log(reviews); */

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {film && (
        <>
          <button type="button" onClick={onGoBack}>
            Back to films
          </button>
          <hr />
          {film.poster_path && (
            <img
              width="100px"
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
            />
          )}
          <h2>
            {film.title} ({film.release_date && film.release_date.slice(0, 4)})
          </h2>
          <p>User Score: {`${film.vote_average * 10}%`}</p>
          <h3>Overview</h3>
          <p>{film.overview}</p>
          <h4>Genres</h4>
          <ul>
            {film.genres &&
              film.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
          </ul>
          <hr />
          <ul>
            Additional information
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
          <hr />
          <Route path="/movies/:movieId/cast">
            <Casts actors={actors} />
          </Route>
          <Route path="/movies/:movieId/reviews">
            {reviews.results && <Reviews reviews={reviews} />}
          </Route>
        </>
      )}
    </>
  );
}
