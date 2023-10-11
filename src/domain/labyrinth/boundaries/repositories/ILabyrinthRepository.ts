import type { IRepository } from 'domain/common/IRepository';
import type { IRepositoryFactory } from 'domain/common/IRepositoryFactory';
import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';

export interface ILabyrinthRepository extends IRepository<ILabyrinth> {
  findOneByName(name: string): Promise<ILabyrinth | null>;
}

export interface ILabyrinthRepositoryFactory
  extends IRepositoryFactory<ILabyrinthRepository> {}
