import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { postMovie } from '../../api';

type NewMovieProps = {
  onAdd: (newMovie: Movie) => void;
  movies: Movie[];
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd, movies }) => {
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    id: movies.length + 1,
    title: '',
    description: '',
    rating: 0,
    release_date: '',
    genre: [],
    actors: [],
    director: '',
    image: '',
  });

  const isSubmitDisabled =
    !formData.title.trim() ||
    !formData.image.trim() ||
    !formData.description.length ||
    !formData.rating.toString().trim();

  const handleInputChange = (name: string, value: string | number | string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSubmitDisabled) {
      const newMovie: Movie = {
        ...formData,
      };

      try {
        const addedMovie = await postMovie(newMovie);
        onAdd(addedMovie);

        setCount(count + 1);

        setFormData({
          id: movies.length + 1,
          title: '',
          description: '',
          rating: 0,
          release_date: '',
          genre: [],
          actors: [],
          director: '',
          image: '',
        });
      } catch (error) {
        console.error('Error adding movie:', error);
      }
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

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
      />

      <TextField
        name="image"
        label="Image URL"
        value={formData.image}
        onChange={value => handleInputChange('image', value)}
        required
      />

      <TextField
        name="rating"
        label="Rating"
        value={formData.rating.toString()}
        onChange={value => handleInputChange('rating', parseFloat(value))}
        required
        type="number"
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
