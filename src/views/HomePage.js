/* import PageHeading from '../PageHeading/PageHeading'; */
import { useState, useEffect } from 'react';
import { Link, /* useRouteMatch, */ useLocation } from 'react-router-dom';
import * as filmsAPI from '../services/apiService';

export default function HomePage() {
  const location = useLocation();
  /* console.log('HomePage:', location); */

  /* const { url } = useRouteMatch(); */
  const [films, setFilms] = useState([]);

  /* console.log(url); */

  useEffect(() => {
    filmsAPI.fetchPopularFilms().then(setFilms);
  }, []);
  /* console.log(films.results.id); */

  /* let filmsAll = films.results; */

  return (
    <div>
      {/* <PageHeading text="hello  h1" /> */}
      <h1>Trending today</h1>
      <ul>
        {films.results &&
          films.results.map(film => (
            <li key={film.id}>
              <Link
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
