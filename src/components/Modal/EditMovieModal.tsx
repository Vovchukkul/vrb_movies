import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import './EditMovieModal.scss';
import { TextField } from '../TextField';
import { updateMovie } from '../../api';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface EditMovieModalProps {
  movieId: number;
  onClose: () => void;
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const EditMovieModal: React.FC<EditMovieModalProps> = ({ movieId, onClose, movies, setMovies }) => {
  const currMovie = movies.find((m: Movie) => m.id === movieId);
  const [formData, setFormData] = useState({
    title: currMovie?.title || '',
    description: currMovie?.description || '',
    rating: currMovie?.rating?.toString() || '',
    release_date: currMovie?.release_date || '',
    genre: (currMovie?.genre || []).join(','),
    actors: (currMovie?.actors || []).join(','),
    director: currMovie?.director || '',
    image: currMovie?.image || '',
    id: currMovie?.id,
  });

  const isSubmitDisabled =
  !formData.title.trim() ||
  !formData.image.trim() ||
  !formData.description.length ||
  !formData.rating.trim();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSubmitDisabled) {
      try {
        const updatedMovie: Movie = {
          ...currMovie,
          title: formData.title,
          description: formData.description,
          rating: parseFloat(formData.rating),
          release_date: formData.release_date,
          genre: formData.genre.split(',').map(g => g.trim()),
          actors: formData.actors.split(',').map(a => a.trim()),
          director: formData.director,
          image: formData.image,
          id: movies.length + 1,
        };
        await updateMovie(movieId, updatedMovie); // Send PATCH request to server
        const updatedMovies = movies.map(movie => (movie.id === movieId ? updatedMovie : movie));
        setMovies(updatedMovies);
        onClose();
      } catch (error) {
        console.error('Error updating movie:', error);
      }
    }
  };

  const handleInputChange = (name: string, value: string | number | string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-icon" onClick={onClose}>
          <FontAwesomeIcon icon={faBackward} />
        </div>
        <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={value => handleInputChange('title', value)}
          required
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={value => handleInputChange('description', value)}
          required
        />
        <TextField
          name="rating"
          label="Rating"
          value={formData.rating}
          onChange={value => handleInputChange('rating', value)}
          required
        />
        <TextField
          name="release_date"
          label="Release Date"
          value={formData.release_date}
          onChange={value => handleInputChange('release_date', value)}
          required
        />
        <TextField
          name="genre"
          label="Genre"
          value={formData.genre}
          onChange={value => handleInputChange('genre', value)}
          required
        />
        <TextField
          name="actors"
          label="Actors"
          value={formData.actors}
          onChange={value => handleInputChange('actors', value)}
          required
        />
        <TextField
          name="director"
          label="Director"
          value={formData.director}
          onChange={value => handleInputChange('director', value)}
          required
        />
        <TextField
          name="image"
          label="Image"
          value={formData.image}
          onChange={value => handleInputChange('image', value)}
          required
        />
          <button type="submit">Save Changes</button>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose} />
    </div>
  );
};

export default EditMovieModal;
