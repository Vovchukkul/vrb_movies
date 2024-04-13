import React, { useMemo } from 'react';
import { useLocalStorage } from '../useLocalStorage';
import { Movie } from '../types/Movie';

type Props = {
  children: React.ReactNode,
};

type SetFavouriteProducts = (value: Movie[] | ((prevState: Movie[]) => Movie[])) => void;

type ContextType = {
  favouriteProducts: Movie[],
  setFavouriteProducts: SetFavouriteProducts,
};

export const FavouriteContext = React.createContext<ContextType>({
  favouriteProducts: [],
  setFavouriteProducts: () => {},
});

export const FavouriteProvider: React.FC<Props> = ({ children }) => {
  const [favouriteProducts, setFavouriteProducts] = useLocalStorage<Movie[]>('favourite', []);

  const value: ContextType = useMemo(() => ({
    favouriteProducts,
    setFavouriteProducts: (value: Movie[] | ((prevState: Movie[]) => Movie[])) => {
      if (typeof value === 'function') {
        // If the value is a function, apply it to the previous state to get the new state
        const newValue = (value as (prevState: Movie[]) => Movie[])(favouriteProducts);
        setFavouriteProducts(newValue);
      } else {
        // If the value is not a function, directly set it as the new state
        setFavouriteProducts(value);
      }
    }
  }), [favouriteProducts, setFavouriteProducts]);

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};

