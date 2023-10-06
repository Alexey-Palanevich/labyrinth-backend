import { ValidationError } from 'domain/common/DomainError';
import { Cell } from 'domain/labyrinth/boundaries/entities/IScheme';

import type { MazeAlgorithm } from 'domain/algorithms/MazeAlgorithm';
import type { ICoordinate } from 'domain/labyrinth/boundaries/entities/ICoordinate';
import type {
  ILabyrinth,
  ILabyrinthInputDTO,
} from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

export class Labyrinth implements ILabyrinth {
  public name: string;
  private readonly _algorithm: MazeAlgorithm;
  private readonly _scheme: IScheme;
  private readonly _gates: ICoordinate[];

  constructor(input: ILabyrinthInputDTO) {
    this.validateInput(input);

    this.name = input.name;
    this._algorithm = input.algorithm;
    this._scheme = input.scheme || this._algorithm.generate();

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

  private validateInput(input: ILabyrinthInputDTO) {
    this.validateName(input.name);

    if (input.scheme) {
      this.validateScheme(input.scheme);
    }
  }

  private validateName(name: string) {
    const isString = () => name && typeof name === 'string';
    if (!isString()) {
      throw new ValidationError("Name isn't provided.", name);
    }

    const isLongName = () => name.length >= 2;
    if (!isLongName()) {
      throw new ValidationError('Name is too short.', name);
    }
  }

  private validateScheme(scheme: IScheme) {
    const isArray = () => scheme instanceof Array;

    const schemeHasRows = () => scheme.length > 0;

    const everyRowHasCells = () => scheme.every((row) => row.length > 0);

    const availableCells = Object.values(Cell);
    const cellsFamiliarType = () =>
      scheme
        .flat()
        .flat()
        .every((cell) => availableCells.includes(cell));

    if (
      !isArray() ||
      !schemeHasRows() ||
      !everyRowHasCells() ||
      !cellsFamiliarType()
    ) {
      throw new ValidationError("Scheme isn't valid.", scheme);
    }
  }

  private validateCoordinate(point: ICoordinate) {
    const isOutsideOfScheme = () => !this.getCell(point);

    if (isOutsideOfScheme()) {
      throw new ValidationError(`Point is outside a scheme.`, point);
    }
  }

  private validatePointForGate(point: ICoordinate) {
    const cellConnectsToFloor = () => {
      const top = this.getCell({ y: point.y - 1, x: point.x });
      const bottom = this.getCell({ y: point.y + 1, x: point.x });
      const right = this.getCell({ y: point.y, x: point.x - 1 });
      const left = this.getCell({ y: point.y, x: point.x + 1 });

      return !![top, bottom, right, left].find((cell) => cell === Cell.FLOOR);
    };

    if (!cellConnectsToFloor()) {
      throw new ValidationError(
        `${Cell.GATE} can't be supplied without connection to ${Cell.FLOOR}.`,
        point,
      );
    }
  }

  private validateGatePoint(point: ICoordinate) {
    const isGatePoint = () => this.getCell(point) === Cell.GATE;

    if (!isGatePoint()) {
      throw new ValidationError(
        `There isn't ${Cell.GATE} on this cell.`,
        point,
      );
    }
  }

  private getCell(point: ICoordinate) {
    return this._scheme[point.y]?.[point.x];
  }

  private setCell(point: ICoordinate, cell: Cell) {
    this._scheme[point.y]![point.x] = cell;
  }

  private findCoordinatesOf(cell: Cell) {
    const points = [];

    for (let y = 0; y < this._scheme.length; y += 1) {
      for (let x = 0; x < this._scheme[y]!.length; x += 1) {
        if (this._scheme[y]![x] === cell) {
          points.push({ x, y });
        }
      }
    }

    return points;
  }
}
