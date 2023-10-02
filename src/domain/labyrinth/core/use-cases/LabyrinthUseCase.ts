import type { ILabyrinthInputDTO } from '../entities/Labyrinth';
import type { IFactory } from 'domain/common/IFactory';
import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import type {
  ICreateLabyrinthInputDTO,
  ILabyrinthRepositoryFactory,
  ILabyrinthUseCase,
} from 'domain/labyrinth/boundaries/use-cases/ILabyrinthUseCase';

export class LabyrinthUseCase implements ILabyrinthUseCase {
  constructor(
    private labyrinthFactory: IFactory<ILabyrinthInputDTO, ILabyrinth>,
    private labyrinthRepositoryFactory: ILabyrinthRepositoryFactory,
  ) {}

  async read(name: string): Promise<ILabyrinth> {
    const r = await this.labyrinthRepositoryFactory
      .create()
      .findOneByName(name);

    console.log(r);

    return r;
  }

  create({ name }: ICreateLabyrinthInputDTO): Promise<ILabyrinth> {
    const labyrinth = this.labyrinthFactory({ name });

    return this.labyrinthRepositoryFactory.create().save(labyrinth);
  }
}
