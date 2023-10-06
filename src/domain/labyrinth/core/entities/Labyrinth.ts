import { Cell } from 'domain/labyrinth/boundaries/entities/IScheme';

import type { MazeAlgorithm } from 'domain/algorithms/MazeAlgorithm';
import type { ICoordinate } from 'domain/labyrinth/boundaries/entities/ICoordinate';
import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

export interface ILabyrinthInputDTO {
  name: string;
  algorithm: MazeAlgorithm;
  scheme?: IScheme;
}

export class Labyrinth implements ILabyrinth {
  public name: string;
  private readonly _algorithm: MazeAlgorithm;
  private readonly _scheme: IScheme;
  private readonly _gates: ICoordinate[];

  constructor({ name, algorithm, scheme }: ILabyrinthInputDTO) {
    this.validateName(name);

    this.name = name;
    this._algorithm = algorithm;
    this._scheme = scheme || this._algorithm.generate();

    this._gates = this.findCoordinatesOf(Cell.GATE);
  }

  public get scheme(): IScheme {
    return this._scheme;
  }

  public get gates() {
    return this._gates;
  }

  public addGate(point: ICoordinate) {
    this.validateCoordinate(point);
    this.validatePointForGate(point);

    this.setCell(point, Cell.GATE);
    this._gates.push(point);
  }

  public removeGate(point: ICoordinate) {
    this.validateGatePoint(point);

    this.setCell(point, Cell.WALL);
    const index = this._gates.indexOf(point);
    return this._gates.splice(index, 1)[0];
  }

  private validateName(name: string) {
    if (name.length < 2) {
      throw new Error('Name length should be more than 2 symbols.');
    }
  }

  private validateCoordinate(point: ICoordinate) {
    if (!this.isInsideOfScheme(point)) {
      throw new Error(`(${point.x}, ${point.y}) is outside of scheme`);
    }
  }

  private isInsideOfScheme(point: ICoordinate) {
    return !!this.getCell(point);
  }

  private validatePointForGate(point: ICoordinate) {
    if (!this.isFloorConnectedToCell(point)) {
      throw new Error(
        `(${point.x},${point.y}) can't be supplied without connection to ${Cell.FLOOR}`,
      );
    }
  }

  private isFloorConnectedToCell(point: ICoordinate) {
    const top = this._scheme[point.y - 1]?.[point.x];
    const bottom = this._scheme[point.y + 1]?.[point.x];
    const right = this._scheme[point.y]?.[point.x - 1];
    const left = this._scheme[point.y]?.[point.x + 1];

    return !![top, bottom, right, left].find((cell) => cell === Cell.FLOOR);
  }

  private validateGatePoint(point: ICoordinate) {
    if (!this.isGatePoint(point)) {
      throw new Error(`${point} isn't ${Cell.GATE}`);
    }
  }

  private isGatePoint(point: ICoordinate) {
    return this.getCell(point) === Cell.GATE;
  }

  private getCell(point: ICoordinate) {
    return this._scheme[point.y][point.x];
  }

  private setCell(point: ICoordinate, cell: Cell) {
    this._scheme[point.y][point.x] = cell;
  }

  private findCoordinatesOf(cell: Cell) {
    const points = [];

    for (let y = 0; y < this._scheme.length; y += 1) {
      for (let x = 0; x < this._scheme[y].length; x += 1) {
        if (this._scheme[y][x] === cell) {
          points.push({ x, y });
        }
      }
    }

    return points;
  }
}
