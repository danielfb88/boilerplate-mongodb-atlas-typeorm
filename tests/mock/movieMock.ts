/* eslint-disable @typescript-eslint/camelcase */
import * as faker from "faker";
import { ObjectID } from "typeorm";
import { Context } from "../../src/Context";
import { Movie } from "../../src/models";

/**
 * Mock Movie
 *
 * @export
 * @param {{ apiMovieId: number }} args
 * @returns {IMovie}
 */
export function mockMovie(apiMovieId?: number): Movie {
  return {
    apiMovieId: apiMovieId || faker.random.number(),
    id: new ObjectID(),
    originalTitle: faker.random.words(),
  };
}

/**
 * Create a movie into DB
 *
 * @export
 */
export function createMovieDB(args: { apiMovieId: number; originalTitle: string }) {
  const movie = new Movie();

  movie.apiMovieId = args.apiMovieId;
  movie.originalTitle = args.originalTitle;

  Context.getInstance().db.movies.save(movie);
}
