import * as filmsAPI from '../services/apiService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import { useParams } from 'react-router'; */
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();
  /* console.log(history); */
  const [search, setSearch] = useState([]);
  const [value, setValue] = useState('');
  /*  const { searchValue } = useParams(); */
  const query = location.search.split('=');
  const [searchValue, setSearchValue] = useState(query[1]);
  /* const [searchValue, setSearchValue] = useState(query[1]); */

  useEffect(() => {
    if (!searchValue) {
      /* toast.error('Please enter search request!'); */
      return;
    }

    filmsAPI.fetchSearchFilms(searchValue).then(setSearch);
  }, [searchValue]);

  /* console.log(search.results); */

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
      <button type="submit">Button</button>
      <hr />

      {search.results && !search.results.length && (
        <h1>{`No results for ${searchValue}`}</h1>
      )}

      {
        <ul>
          {search.results &&
            search.results.map(result => (
              <li key={result.id}>
                <Link
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

/*  useEffect(() => {
    const final = search.results.filter(result =>
      result.original_title.toLowerCase().includes(value),
    );
    setSearch(final);
  }, [value]); */

/* const filteredCountries = () => {
    if (search.results !== 0) {
      search.results.filter(result => {
        return result.original_title
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    } else return;
  }; */

/* useEffect(() => {
    filmsAPI.fetchSearchFilms().then(setFilms);
  }, []);
  console.log(films.results); */

/* useEffect(
    prevState => {
      if (search === '') {
        return;
      } else if (prevState !== search && search !== '') {
        searchImagesHandler();
      }
    },
    // eslint-disable-next-line
    [search],
  );

  const searchImagesHandler = async () => {
    setError('');
    try {
      const result = await filmsAPI.fetchSearchFilms(search);

      if (result.total !== 0) {
        setSearch(prevState => [...prevState, ...result]);
      } else {
        toast.info(`Nothing found for ${search}!`);
        setSearch([]);
      }
    } catch (error) {
      console.error(error);
      setError(error.toString());
    } finally {
    }
  }; */
