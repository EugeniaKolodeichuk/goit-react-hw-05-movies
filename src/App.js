import { Switch, Route } from 'react-router';
import AppBar from './components/AppBar/AppBar';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import NotFoundPage from './views/NotFoundPage';
import MovieDetailsPage from './views/MovieDetailsPage';

export default function App() {
  return (
    <div>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        {/* <Route path="/movies/:movieId/cast">
          <MovieDetailsPage />
        </Route>

        <Route path="/movies/:movieId/reviews">
          <MovieDetailsPage />
        </Route> */}

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}
