import React, { useState } from 'react';
import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';
import { Link } from 'react-router-dom';
import EditMovieModal from '../Modal/EditMovieModal';
import { deleteMovie } from '../../api';

interface Props {
  movies: Movie[];
  query: string;
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export const MoviesList: React.FC<Props> = ({ movies, query, setMovies }) => {
  const [editMovieId, setEditMovieId] = useState<number | null>(null);
  const filteredMovies = movies.filter(movie => {
    const lowerCaseQuery = query.toLowerCase();
    return movie.title.toLowerCase().includes(lowerCaseQuery);
  });

  const handleDeleteMovie = async (e: React.MouseEvent<HTMLButtonElement>, movieId: number) => {
    e.preventDefault();
    try {
      await deleteMovie(movieId);
      const newMovies = movies.filter(m => m.id !== movieId);
      setMovies(newMovies);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEditMovie = (e: React.MouseEvent<HTMLButtonElement>, movieId: number) => {
    e.preventDefault();
    setEditMovieId(movieId);
  };


  return (
    <div className="movies">
      {filteredMovies.map(movie => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <MovieCard
              handleDeleteMovie={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDeleteMovie(e, movie.id)}
              movie={movie}
              handleEditMovie={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleEditMovie(e, movie.id)}
            />
          </Link>
        </div>
      ))}
      {editMovieId !== null && (
        <EditMovieModal
          movieId={editMovieId}
          onClose={() => setEditMovieId(null)}
          movies={movies}
          setMovies={setMovies}
        />
      )}
    </div>
  );
};
