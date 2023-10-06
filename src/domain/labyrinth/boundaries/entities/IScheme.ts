// TODO: use Letters?
export enum Cell {
  FLOOR = 1, // skip 0 as falsy value
  WALL,
  GATE,
  TRAP,
  MONSTER,
  TREASURE,
}

type Row = [Cell, ...Cell[]];
export type IScheme = [Row, ...Row[]];
