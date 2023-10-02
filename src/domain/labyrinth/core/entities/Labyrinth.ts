import { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import { Cell, IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

export interface ILabyrinthInputDTO {
  name: string;
}

export class Labyrinth implements ILabyrinth {
  public name: string;
  private readonly _scheme: IScheme;

  constructor({ name }: ILabyrinthInputDTO) {
    this.name = name;
    this._scheme = [
      [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
      [Cell.ENTRANCE, Cell.FLOOR, Cell.FLOOR, Cell.WALL],
      [Cell.WALL, Cell.WALL, Cell.FLOOR, Cell.WALL],
      [Cell.WALL, Cell.WALL, Cell.ENTRANCE, Cell.WALL],
    ];
  }

  public get scheme(): IScheme {
    return this._scheme;
  }
}
