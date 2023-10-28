import { KruskalAlgorithm } from 'domain/algorithms/KruskalAlgorithm';
import { Cell } from 'domain/labyrinth/boundaries/entities/IScheme';
import assert from 'node:assert';
import { describe, test } from 'node:test';

describe("Kruskal's Maze Algorithm.", () => {
  test('should accept maze size', () => {
    assert.ok(new KruskalAlgorithm(2, 1));
  });

  const width = 6;
  const length = 4;
  const algorithm = new KruskalAlgorithm(width, length);

  const scheme = algorithm.generate();

  test('create scheme needed size with different width and length', () => {
    assert.ok(scheme instanceof Array);
    assert.equal(scheme.length, length);
    assert.equal(scheme[0].length, width);
  });

  test('scheme includes entrance on border', () => {
    const up = scheme.at(0) || [];
    const down = scheme.at(-1) || [];
    const left = scheme.map((row) => row[0]);
    const right = scheme.map((row) => row.at(-1));

    assert.ok(
      [...up, ...down, ...left, ...right].find((cell) => cell === Cell.GATE),
    );
  });

  test('scheme include gates', () => {
    assert.equal(
      scheme
        .flat()
        .flat()
        .filter((cell) => cell === Cell.GATE).length,
      2,
    );
  });

  test('scheme includes walls and exit', () => {
    const cells = scheme.flat().flat();
    assert.equal(
      cells.filter((cell) => cell === Cell.WALL).length,
      width * length - 2, // exit and entrance
    );
  });

  test('scheme includes floor between entrance and exit', () => {});
});
