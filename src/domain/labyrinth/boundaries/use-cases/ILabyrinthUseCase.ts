import type { ILabyrinth } from '../entities/ILabyrinth';
import type { IRepository } from 'domain/common/IRepository';
import type { IRepositoryFactory } from 'domain/common/IRepositoryFactory';

export interface ICreateLabyrinthInputDTO {
  name: string;
  seed: number;
}

export interface ILabyrinthRepository extends IRepository<ILabyrinth> {
  findOneByName(name: string): Promise<ILabyrinth | null>;
}
export interface ILabyrinthRepositoryFactory
  extends IRepositoryFactory<ILabyrinthRepository> {}

export interface ILabyrinthUseCase {
  read(name: string): Promise<ILabyrinth>;

  create(config: ICreateLabyrinthInputDTO): Promise<ILabyrinth>;
  //
  // update(name: Config): ILabyrinth;
  //
  // delete(name: string): ILabyrinth;
}
