import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as filmsAPI from '../services/apiService';
import styles from './views.module.css';

export default function HomePage() {
  const location = useLocation();

  const [films, setFilms] = useState([]);

  useEffect(() => {
    filmsAPI.fetchPopularFilms().then(setFilms);
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Trending today</h1>
      <ul className={styles.list_order}>
        {films.results &&
          films.results.map(film => (
            <li key={film.id}>
              <Link
                className={styles.link}
                to={{
                  pathname: `/movies/${film.id}`,
                  state: { from: location },
                }}
              >
                {film.title}
                {film.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
