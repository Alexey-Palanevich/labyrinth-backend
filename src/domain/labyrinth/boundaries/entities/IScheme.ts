export enum Cell {
  FLOOR,
  WALL,
  GATE,
  TRAP,
  MONSTER,
  TREASURE,
}

export type IScheme = Array<Array<Cell>>;
