import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useLocation, useHistory } from 'react-router';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import * as filmsAPI from '../services/apiService';

import defaultImage from '../default_photo.png';
import styles from './views.module.css';

const Casts = lazy(() => import('./Cast.js' /*webpackChunkName: "casts"*/));
const Reviews = lazy(() =>
  import('./Reviews.js' /*webpackChunkName: "reviews"*/),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();

  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [film, setFilms] = useState([]);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    filmsAPI.fetchFilmById(movieId).then(setFilms);
  }, [movieId]);

  useEffect(() => {
    filmsAPI.fetchCast(movieId).then(setActors);
  }, [movieId]);

  useEffect(() => {
    filmsAPI.fetchRewiew(movieId).then(setReviews);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <div className={styles.main}>
      {film && (
        <>
          <button type="button" onClick={onGoBack}>
            Go back
          </button>
          <hr />

          {film.poster_path ? (
            <img
              width="400px"
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
            />
          ) : (
            <img width="400px" src={defaultImage} alt={film.title} />
          )}
          <h1>
            {film.title} ({film.release_date && film.release_date.slice(0, 4)})
          </h1>
          <h2>User Score: {`${film.vote_average * 10}%`}</h2>
          <p>
            <b>Overview</b>
          </p>
          <p>{film.overview}</p>
          <p>
            <b>Genres</b>
          </p>

          {film.genres &&
            film.genres.map(genre => <p key={genre.id}>{genre.name}</p>)}
          <hr />
          <ul className={styles.list_noorder}>
            <b>Additional information</b>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state.from },
                }}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state.from },
                }}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route path="/movies/:movieId/cast">
              <Casts actors={actors} />
            </Route>
            <Route path="/movies/:movieId/reviews">
              {reviews.results && <Reviews reviews={reviews} />}
            </Route>
          </Suspense>
        </>
      )}
    </div>
  );
}
