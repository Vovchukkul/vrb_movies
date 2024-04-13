import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { MoviePage } from './components/MoviePage/MoviePage';
import { FavouriteProvider } from './context/FavouriteContext';
import { Movie } from './types/Movie';
import { Favourities } from './components/Favourities/Favourities';
import { getMovies } from './api';

export function Root() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMovies();
        setMovies(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <FavouriteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App movies={movies} query={query} setQuery={setQuery} setMovies={setMovies} />} />
          <Route path="/movie/:movieId" element={<MoviePage movies={movies} />} />
          <Route path="/favourites" element={<Favourities />} />
        </Routes>
      </Router>
    </FavouriteProvider>
  );
}

export default Root;
