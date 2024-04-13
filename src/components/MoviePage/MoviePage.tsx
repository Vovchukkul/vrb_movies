import React from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../../types/Movie';

interface Props {
  movies: Movie[];
}

export const MoviePage: React.FC<Props> = ({ movies }) => {
  const { movieId } = useParams<{ movieId: string }>();
  const selectedMovie = movies.find(movie => movie.id.toString() === movieId);

  return (
    <div className="moviepage">
      {selectedMovie ? (
        <>
          <h2>Description: {selectedMovie.description}</h2>
          <p>Actors: {selectedMovie.actors}</p>
          <p>Director: {selectedMovie.director}</p>
          <p>Genre: {selectedMovie.genre}</p>
          <p>Rating: {selectedMovie.rating}</p>
        </>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
};
