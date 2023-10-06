import type { ICoordinate } from './ICoordinate';
import type { IScheme } from './IScheme';
import type { MazeAlgorithm } from 'domain/algorithms/MazeAlgorithm';

/**
 * Labyrinth is a big dungeon with a lot of paths, traps, monsters and treasures.
 */
export interface ILabyrinth {
  get name(): string;
  get scheme(): IScheme;

  get gates(): ICoordinate[];
  addGate(point: ICoordinate): void;
  removeGate(point: ICoordinate): void;

  // TODO: implement traps, monsters and treasures;
  // traps: Map<ICoordinate, string>;
  // monsters: Map<ICoordinate, string>;
  // treasures: Map<ICoordinate, string>;
}

export interface ILabyrinthInputDTO {
  name: string;
  algorithm: MazeAlgorithm;
  scheme?: IScheme;
}
