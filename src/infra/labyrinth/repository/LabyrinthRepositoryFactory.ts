import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import type {
  ILabyrinthRepository,
  ILabyrinthRepositoryFactory,
} from 'domain/labyrinth/boundaries/use-cases/ILabyrinthUseCase';

export class LabyrinthRepositoryFactory implements ILabyrinthRepositoryFactory {
  create(): ILabyrinthRepository {
    return new LabyrinthRepository();
  }
}

const inMemoryDB = {};
export class LabyrinthRepository implements ILabyrinthRepository {
  async save(entity: Partial<ILabyrinth>): Promise<ILabyrinth> {
    const name = entity.name || '';
    inMemoryDB[name] = entity;

    return inMemoryDB[name] as ILabyrinth;
  }

  async find(entity: Partial<ILabyrinth>): Promise<ILabyrinth | null> {
    return (inMemoryDB[entity.name] as ILabyrinth) ?? null;
  }

  async findOneByName(name: string): Promise<ILabyrinth | null> {
    console.log(inMemoryDB, name);
    return (inMemoryDB[name] as ILabyrinth) ?? null;
  }
}
