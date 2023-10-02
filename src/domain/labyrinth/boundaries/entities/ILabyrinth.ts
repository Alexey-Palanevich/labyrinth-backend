import { ICoordinate } from './ICoordinate';
import { IScheme } from './IScheme';

/**
 * Labyrinth is a big dungeon with a lot of paths, traps, monsters and treasures.
 */
export interface ILabyrinth {
  get name(): string;
  get scheme(): IScheme;
  //
  // entrances: Map<ICoordinate, string>;
  // traps: Map<ICoordinate, string>;
  // monsters: Map<ICoordinate, string>;
  // treasures: Map<ICoordinate, string>;
  //
  // addEntrance(): void;
  //
  // addTrap(): void;
  //
  // addMonster(): void;
  //
  // addTreasure(): void;
}
