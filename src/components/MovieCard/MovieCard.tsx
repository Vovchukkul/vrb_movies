import React, { useContext, useState, useEffect } from 'react';
import { Movie } from '../../types/Movie';
import './MovieCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FavouriteContext } from '../../context/FavouriteContext';

type Props = {
  movie: Movie;
  handleDeleteMovie: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleEditMovie: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const MovieCard: React.FC<Props> = ({ movie, handleDeleteMovie, handleEditMovie }) => {
  const { favouriteProducts, setFavouriteProducts } = useContext(FavouriteContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favouriteProducts.some((favMovie) => favMovie.id === movie.id));
    console.log(liked);
  }, [favouriteProducts, movie.id]);

  const isAlreadyLiked = favouriteProducts.some((favMovie) => favMovie.id === movie.id);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLiked(!liked);


    if (!isAlreadyLiked) {
      setFavouriteProducts((prevProducts: Movie[]) => [...prevProducts, movie]);
    } else {
      setFavouriteProducts((prevProducts: Movie[]) => prevProducts.filter((favMovie) => favMovie.id !== movie.id));
    }
  };

  return (
    <div className="card" data-cy="movie-card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={movie.image} alt="Film logo" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="images/imdb-logo.jpeg" alt="imdb" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-8">{movie.title}</p>
          </div>
        </div>
        <div className="content">
          {movie.rating}
          <br />
          {movie.release_date}
          <br />
          <div className="button_wrap">
            <button className="delete-button btn" onClick={handleDeleteMovie}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="edit-button btn" onClick={handleEditMovie}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button className="like-button btn" onClick={handleLike}>
              {!isAlreadyLiked
                ? (
                  <FontAwesomeIcon icon={regularHeart} />
                ) : (
                  <FontAwesomeIcon icon={faThumbsUp} />
                )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
