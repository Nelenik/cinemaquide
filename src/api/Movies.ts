import { z } from "zod";
import { fetchJson } from "@/utils";
import { URL } from "@/constants";

const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  relaseYear: z.number(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string(),
  revenue: z.string(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string(),
  backdropUrl: z.string(),
  trailerUrl: z.string(),
  trailerYoutubeId: z.string(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string(),
  production: z.string(),
  awardsSummary: z.string(),
});

const GenresSchema = z.array(z.string());

const MoviesListSchema = z.array(MovieSchema);

type Movie = z.infer<typeof MovieSchema>;
type MoviesList = z.infer<typeof MoviesListSchema>;
type Genres = z.infer<typeof GenresSchema>;

type SearchFiltres = { [key: string]: unknown };

//common function for getting movies list
const fetchMoviesList = (
  ...args: [string, RequestInit?]
): Promise<MoviesList> => {
  return fetchJson<MoviesList>(true, ...args).then((movieList) =>
    MoviesListSchema.parse(movieList)
  );
};

export const getMovies = (
  searchFiltres: SearchFiltres = {}
): Promise<MoviesList> => {
  const transformedFiltres = Object.entries(searchFiltres).reduce(
    (filtres: { [key: string]: string }, [key, value]) => {
      filtres[key] = String(value);
      return filtres;
    },
    {}
  );
  const searchStr = new URLSearchParams(transformedFiltres).toString();
  return fetchMoviesList(`${URL}/movie${searchStr}`);
};

export const getTop10 = (): Promise<MoviesList> => {
  return fetchMoviesList(`${URL}/movie/top10`);
};

export const getGenres = (): Promise<Genres> => {
  return fetchJson<Genres>(true, `${URL}/movie/genres`).then((genres) =>
    GenresSchema.parse(genres)
  );
};

export const getMovie = (movieBy: number | "random"): Promise<Movie> => {
  return fetchJson<Movie>(true, `${URL}/${movieBy}`).then((movie) =>
    MovieSchema.parse(movie)
  );
};

export const getFavorites = (): Promise<MoviesList> => {
  return fetchMoviesList(`${URL}/favorites`, {
    method: "GET",
    credentials: "include",
  });
};

export const addFavoriteFilm = (movieId: string): Promise<void> => {
  return fetchJson<void>(false, `${URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ id: movieId }),
    credentials: "include",
  });
};

export const removeFromFavorites = (movieId: number): Promise<void> => {
  return fetchJson<void>(false, `${URL}/favorites/${movieId}`, {
    method: "DELETE",
    credentials: "include",
  });
};
