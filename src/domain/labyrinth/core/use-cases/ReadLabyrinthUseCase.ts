import { ValidationError } from 'domain/common/DomainError';

import type { ILabyrinthRepositoryFactory } from 'domain/labyrinth/boundaries/repositories/ILabyrinthRepository';
import type {
  IReadLabyrinthUseCase,
  IReadLabyrinthUseCaseOutputDto,
} from 'domain/labyrinth/boundaries/use-cases/IReadLabyrinthUseCase';

export class ReadLabyrinthUseCase implements IReadLabyrinthUseCase {
  constructor(
    private labyrinthRepositoryFactory: ILabyrinthRepositoryFactory,
  ) {}

  async execute(name: string): Promise<IReadLabyrinthUseCaseOutputDto | null> {
    await this.validate(name);

    return this.labyrinthRepositoryFactory.create().findOneByName(name);
  }

  private async validate(name: string) {
    // TODO: do we really need this checks if nest already has pipes?
    // But core must be independent from outside layer
    if (!name || typeof name !== 'string') {
      throw new ValidationError("Name isn't provided.", name);
    }
  }
}
