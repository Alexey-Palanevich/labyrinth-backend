import { MazeAlgorithm } from 'domain/algorithms/MazeAlgorithm';
import { Cell } from 'domain/labyrinth/boundaries/entities/IScheme';

import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

class MockedMazeAlgorithm extends MazeAlgorithm {
  generate(): IScheme {
    return [
      [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
      [Cell.GATE, Cell.FLOOR, Cell.FLOOR, Cell.WALL],
      [Cell.WALL, Cell.FLOOR, Cell.WALL, Cell.WALL],
      [Cell.WALL, Cell.GATE, Cell.WALL, Cell.WALL],
    ];
  }
}

export const mockedAlgorithm = new MockedMazeAlgorithm();
