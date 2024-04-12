import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [query, setQuery] = useState('');

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, newMovie]);
  };


  const confirmInputChanges = (event: { target: { value: string; }; }) => {
    setQuery(event.target.value.trim());
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={confirmInputChanges}
              />
            </div>
          </div>
        </div>
        <MoviesList query={query} movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
