import { MazeAlgorithm } from 'domain/algorithms/MazeAlgorithm';
import { Cell } from 'domain/labyrinth/boundaries/entities/IScheme';

import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

/**
 * Kruskal’s algorithm is a method for producing a minimal spanning tree from a weighted graph. The algorithm I’ll cover here is actually a randomized version of Kruskal’s; the original works something like this:
 * Throw all of the edges in the graph into a big burlap sack. (Or, you know, a set or something.)
 * Pull out the edge with the lowest weight. If the edge connects two disjoint trees, join the trees. Otherwise, throw that edge away.
 * Repeat until there are no more edges left.
 */
export class KruskalAlgorithm extends MazeAlgorithm {
  generate(): IScheme {
    const withWalls = this.createWithWalls();
    const withWallsAndEntrance = this.fillEntrance(withWalls as IScheme);
    const withWallsAndEntranceAndExit = this.fillExit(withWallsAndEntrance);

    return withWallsAndEntranceAndExit;
  }

  private createWithWalls() {
    const row = this.createRowWithWalls();

    return new Array(this.length).fill(row);
  }

  private createRowWithWalls() {
    return new Array(this.width).fill(Cell.WALL);
  }

  /**
   * Exit can be anywhere?
   */
  private fillExit(scheme: IScheme): IScheme {
    const copy = JSON.parse(JSON.stringify(scheme));

    const point = this.getRandomCell();

    if (this.isAlreadyEntrance(scheme, point)) {
      return this.fillExit(scheme);
    }

    copy[point.y][point.x] = Cell.GATE;

    return copy;
  }

  private isAlreadyEntrance(scheme: IScheme, point: { x: number; y: number }) {
    return scheme[point.y]?.[point.x] === Cell.GATE;
  }

  private fillEntrance(scheme: IScheme) {
    const sides = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];
    const side = sides[Math.floor(Math.random() * sides.length)];

    const point = this.getRandomCell();

    switch (side) {
      case 'TOP':
        point.y = 0;
        break;
      case 'BOTTOM':
        point.y = this.length - 1;
        break;

      case 'LEFT':
        point.x = 0;
        break;
      case 'RIGHT':
        point.x = this.width - 1;
        break;
    }

    const copy = JSON.parse(JSON.stringify(scheme));

    copy[point.y][point.x] = Cell.GATE;

    return copy;
  }

  private getRandomCell() {
    return {
      x: Math.floor(Math.random() * (this.width - 1)),
      y: Math.floor(Math.random() * (this.length - 1)),
    };
  }
  // private getRandomCoordinate(len: number) {
  //   return Math.floor(Math.random() * len) - 1;
  // }
}
