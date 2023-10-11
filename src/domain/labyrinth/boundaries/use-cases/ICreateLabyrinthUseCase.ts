import type { AvailableAlgorithms } from 'domain/algorithms/AvailableAlgorithms';
import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

export interface ICreateLabyrinthUseCase {
  execute(
    input: ICreateLabyrinthUseCaseInputDto,
  ): Promise<ICreateLabyrinthUseCaseOutputDto>;
}

export interface ICreateLabyrinthUseCaseInputDto {
  name: string;
  algorithm: AvailableAlgorithms;
  scheme?: IScheme | null;
}

export interface ICreateLabyrinthUseCaseOutputDto
  extends Pick<ILabyrinth, 'name' | 'scheme' | 'gates'> {}
