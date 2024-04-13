import './App.scss';
import React from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import { Link } from 'react-router-dom';

type Props = {
  movies: Movie[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
};

export const App: React.FC<Props> = ({ movies, query, setQuery, setMovies }) => {
  const handleAddMovie = (newMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, newMovie]);
  };

  const confirmInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
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
        <Link to='/favourites'>
          <button className='fav_button'>Go to favourities</button>
        </Link>
        {movies && movies.length > 0 && (
          <MoviesList setMovies={setMovies} query={query} movies={movies} />
        )}
      </div>
      <div className="sidebar">
        {movies && movies.length > 0 && <NewMovie movies={movies} onAdd={handleAddMovie} />}
      </div>
    </div>
  );
};
