import React from 'react';

import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';

interface Props {
  movies: Movie[];
  query: string,
}

export const MoviesList: React.FC<Props> = ({ movies, query }) => {
  const filteredMovies = movies.filter((movie) => {
    const lowerCaseQuery = query.toLowerCase();

    return (
      movie.title.toLowerCase().includes(lowerCaseQuery)
     || movie.description.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="movies">
      {filteredMovies.map(movie => (
        <MovieCard
          key={movie.imdbId}
          movie={movie}
        />
      ))}
    </div>
  )
};
