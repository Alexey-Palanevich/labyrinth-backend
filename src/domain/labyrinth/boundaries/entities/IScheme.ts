export enum Cell {
  FLOOR,
  WALL,
  ENTRANCE,
  TRAP,
  MONSTER,
  TREASURE,
}

export type IScheme = Array<Array<Cell>>;
