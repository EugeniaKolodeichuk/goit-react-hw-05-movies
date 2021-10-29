import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import AppBar from './components/AppBar/AppBar';
/* import HomePage from './views/HomePage'; */
/* import MoviesPage from './views/MoviesPage'; */
/* import NotFoundPage from './views/NotFoundPage';
import MovieDetailsPage from './views/MovieDetailsPage'; */

const HomePage = lazy(() =>
  import('./views/HomePage.js' /*webpackChunkName: "home-page"*/),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage.js' /*webpackChunkName: "movies-page"*/),
);
const NotFoundPage = lazy(() =>
  import('./views/NotFoundPage.js' /*webpackChunkName: "not-found-page"*/),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage.js' /*webpackChunkName: "movies-details-page"*/
  ),
);

export default function App() {
  return (
    <div>
      <AppBar />

      <Suspense fallback={<h1>Loading...</h1>}>
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

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
