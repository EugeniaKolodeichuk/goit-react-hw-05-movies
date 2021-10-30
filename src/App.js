import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

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
    <Container>
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
    </Container>
  );
}
