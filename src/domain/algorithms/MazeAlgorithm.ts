import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

export abstract class MazeAlgorithm {
  constructor(
    protected width = 10,
    protected length = 10,
  ) {}

  abstract generate(): IScheme;
}
