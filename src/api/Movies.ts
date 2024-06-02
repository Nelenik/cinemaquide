import { z } from "zod";
import { validateResponse } from "@/utils";
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
  return fetch(`${URL}/movie${searchStr}`)
    .then(validateResponse)
    .then((movies) => MoviesListSchema.parse(movies));
};

export const getTop10 = (): Promise<MoviesList> => {
  return fetch(`${URL}/movie/top10`)
    .then(validateResponse)
    .then((top10) => MoviesListSchema.parse(top10));
};

export const getGenres = (): Promise<Genres> => {
  return fetch(`${URL}/movie/genres`)
    .then(validateResponse)
    .then((genres) => GenresSchema.parse(genres));
};

export const getMovie = (movieBy: number | "random"): Promise<Movie> => {
  return fetch(`${URL}/${movieBy}`)
    .then(validateResponse)
    .then((movie) => MovieSchema.parse(movie));
};
