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
        const newValue = (value as (prevState: Movie[]) => Movie[])(favouriteProducts);
        setFavouriteProducts(newValue);
      } else {
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
