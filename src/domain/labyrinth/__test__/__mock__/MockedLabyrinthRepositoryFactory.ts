import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import type {
  ILabyrinthRepository,
  ILabyrinthRepositoryFactory,
} from 'domain/labyrinth/boundaries/repositories/ILabyrinthRepository';

const inMemory: Record<string, ILabyrinth> = {};
class MockedLabyrinthRepository implements ILabyrinthRepository {
  async find(entity: Partial<ILabyrinth>): Promise<ILabyrinth | null> {
    return entity.name ? inMemory[entity.name] || null : null;
  }

  async findOneByName(name: string): Promise<ILabyrinth | null> {
    return inMemory[name] || null;
  }

  async save(entity: Partial<ILabyrinth>): Promise<ILabyrinth> {
    inMemory[entity?.name || ''] = entity as ILabyrinth;

    return entity as ILabyrinth;
  }
}

export class MockedLabyrinthRepositoryFactory
  implements ILabyrinthRepositoryFactory
{
  create(): ILabyrinthRepository {
    return new MockedLabyrinthRepository();
  }

  static inMemory = inMemory;
}
