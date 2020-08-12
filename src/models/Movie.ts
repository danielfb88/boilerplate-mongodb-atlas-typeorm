import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Movie {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  apiMovieId!: number;

  @Column()
  originalTitle!: string;
}
