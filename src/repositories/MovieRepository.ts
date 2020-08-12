import { EntityRepository, Repository } from "typeorm";
import { Movie } from "../models";

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}
