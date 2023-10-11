import type { AvailableAlgorithms } from 'domain/algorithms/AvailableAlgorithms';
import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

export interface ICreateLabyrinthUseCase {
  execute(
    input: ICreateLabyrinthUseCaseInputDTO,
  ): Promise<ICreateLabyrinthUseCaseOutputDTO>;
}

export interface ICreateLabyrinthUseCaseInputDTO {
  name: string;
  algorithm: AvailableAlgorithms;
  scheme?: IScheme;
}

export interface ICreateLabyrinthUseCaseOutputDTO extends ILabyrinth {}
