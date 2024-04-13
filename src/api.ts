import { Movie } from "./types/Movie";
import { client } from "./utils/fetchClient";

export const getMovies = () => {
  return client.get<Movie[]>('/movies');
};

export const postMovie = (movie: Movie) => {
  return client.post<Movie>('/movies', {
    title: movie.title,
    description: movie.description,
    rating: movie.rating,
    release_date: movie.release_date,
    genre: movie.genre,
    actors: movie.actors,
    director: movie.director,
    image: movie.image,
  });
}

export const deleteMovie = (movieId: number) => {
  return client.delete(`/movies/${movieId}`);
}

export const updateMovie = (movieId: number, movie: Movie) => {
  return client.patch(`/movies/${movieId}`, {
    title: movie.title,
    description: movie.description,
    rating: movie.rating,
    release_date: movie.release_date,
    genre: movie.genre,
    actors: movie.actors,
    director: movie.director,
    image: movie.image,
  });
}
