import { useContext } from "react";
import { FavouriteContext } from "../../context/FavouriteContext";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Favourities.scss';

export const Favourities = () => {
  const { favouriteProducts, setFavouriteProducts } = useContext(FavouriteContext);

  const handleDeleteMovie = (id: number) => {
    const updatedFavorites = favouriteProducts.filter(movie => movie.id !== id);
    setFavouriteProducts(updatedFavorites);
  };

  return (
    <div className="favourites">
      <h1 className="title">Favourities</h1>
      {favouriteProducts.length === 0 && <span>There is no favourite movies</span> }
      {favouriteProducts.map((movie) => (
        <div className="fav_card" key={movie.id}>
          <img className="fav_img" src={movie.image} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <button className="delete-button_fav btn" onClick={() => handleDeleteMovie(movie.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
}
