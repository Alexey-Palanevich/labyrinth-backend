import { ValidationError } from 'domain/common/DomainError';
import { Labyrinth } from 'domain/labyrinth/core/entities/Labyrinth';

import type { IAlgorithmRepositoryFactory } from 'domain/algorithms/boundaries/repositories/IAlgorithmRepository';
import type { ILabyrinthRepositoryFactory } from 'domain/labyrinth/boundaries/repositories/ILabyrinthRepository';
import type {
  ICreateLabyrinthUseCase,
  ICreateLabyrinthUseCaseInputDTO,
  ICreateLabyrinthUseCaseOutputDTO,
} from 'domain/labyrinth/boundaries/use-cases/ICreateLabyrinthUseCase';

export class CreateLabyrinthUseCase implements ICreateLabyrinthUseCase {
  constructor(
    private algorithmRepositoryFactory: IAlgorithmRepositoryFactory,
    private labyrinthRepositoryFactory: ILabyrinthRepositoryFactory,
  ) {}

  async execute(
    input: ICreateLabyrinthUseCaseInputDTO,
  ): Promise<ICreateLabyrinthUseCaseOutputDTO> {
    this.validate(input);
    await this.validateExistedlabyrinth(input.name);

    const algorithm = this.algorithmRepositoryFactory
      .create()
      .find(input.algorithm);

    return this.labyrinthRepositoryFactory
      .create()
      .save(
        new Labyrinth({ name: input.name, algorithm, scheme: input.scheme }),
      );
  }

  private validate({ name, algorithm }: ICreateLabyrinthUseCaseInputDTO) {
    this.validateName(name);
    this.validateAlgorithm(algorithm);
  }

  private validateName(name: string) {
    const isNamePassed = () => !!name && typeof name === 'string';
    if (!isNamePassed()) {
      throw new ValidationError("Name isn't provided.", name);
    }
  }

  private validateAlgorithm(algorithm: string) {
    const isAlgorithmPassed = () =>
      !!algorithm && typeof algorithm === 'string';

    if (!isAlgorithmPassed()) {
      throw new ValidationError("Algorithm isn't provided.", algorithm);
    }
  }

  private async validateExistedlabyrinth(name: string) {
    const existedLabyrinth = await this.labyrinthRepositoryFactory
      .create()
      .findOneByName(name);

    if (existedLabyrinth) {
      throw new ValidationError(
        'Labyrinth with given name already exists.',
        name,
      );
    }
  }
}
