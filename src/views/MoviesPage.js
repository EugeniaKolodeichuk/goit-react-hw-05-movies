import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as filmsAPI from '../services/apiService';
import styles from './views.module.css';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();

  const [search, setSearch] = useState([]);
  const [value, setValue] = useState('');

  const query = location.search.split('=');
  const [searchValue, setSearchValue] = useState(query[1]);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    filmsAPI.fetchSearchFilms(searchValue).then(setSearch);
  }, [searchValue]);

  const changeHandler = e => {
    setValue(e.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (value.trim() === '') {
      toast.error('Please enter search request!');
      return;
    }
    history.push(`/movies?query=${value}`);
    setSearchValue(value);
    setValue('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search films"
        onChange={changeHandler}
        value={value}
      ></input>
      <button type="submit">Search</button>
      <hr />

      {search.results && !search.results.length && (
        <h1>{`No results for ${searchValue}`}</h1>
      )}

      {
        <ul className={styles.list_noorder}>
          {search.results &&
            search.results.map(result => (
              <li key={result.id}>
                <Link
                  className={styles.link}
                  to={{
                    pathname: `/movies/${result.id}`,
                    state: { from: location },
                  }}
                >
                  {result.original_title}
                </Link>
              </li>
            ))}
        </ul>
      }

      <ToastContainer autoClose={2000} />
    </form>
  );
}
