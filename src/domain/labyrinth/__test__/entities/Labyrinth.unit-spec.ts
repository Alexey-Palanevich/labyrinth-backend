import * as check from 'assert';
import { MazeAlgorithm } from 'domain/algorithms/MazeAlgorithm';
import { Cell } from 'domain/labyrinth/boundaries/entities/IScheme';
import { Labyrinth } from 'domain/labyrinth/core/entities/Labyrinth';
import { describe, test } from 'node:test';

import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

class MockMazeAlgorithm extends MazeAlgorithm {
  generate(): IScheme {
    return [
      [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
      [Cell.GATE, Cell.FLOOR, Cell.FLOOR, Cell.WALL],
      [Cell.WALL, Cell.FLOOR, Cell.WALL, Cell.WALL],
      [Cell.WALL, Cell.GATE, Cell.WALL, Cell.WALL],
    ];
  }
}
const mockAlgorithm = new MockMazeAlgorithm();
const gatePoints = {
  entry: {
    x: 0,
    y: 1,
  },
  exit: {
    x: 1,
    y: 3,
  },
  additionalOne: {
    x: 2,
    y: 0,
  },
  additionalTwo: {
    x: 3,
    y: 1,
  },
  uneasy: {
    x: 3,
    y: 3,
  },
};

describe('Labyrinth Entity', () => {
  test('should be defined', () => {
    check.ok(Labyrinth);
  });

  describe('Labyrinth attributes:', () => {
    describe('name', () => {
      test('has name', () => {
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });

        check.ok(labyrinth.name);
      });

      test('throws error if name length less than two symbol.', () => {
        check.throws(
          () => {
            new Labyrinth({ name: '', algorithm: mockAlgorithm });
          },
          { message: 'Name length should be more than 2 symbols.' },
        );
      });
    });

    describe('algorithm', () => {
      test('has maze generation algorithm', () => {
        new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });
      });
    });

    describe('scheme', () => {
      test('can take a ready scheme', () => {
        const scheme: IScheme = [
          [Cell.WALL, Cell.WALL, Cell.WALL, Cell.WALL],
          [Cell.GATE, Cell.FLOOR, Cell.FLOOR, Cell.WALL],
          [Cell.WALL, Cell.FLOOR, Cell.WALL, Cell.WALL],
          [Cell.WALL, Cell.GATE, Cell.WALL, Cell.WALL],
        ];
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
          scheme,
        });

        check.deepEqual(scheme, labyrinth.scheme);
      });

      test("generates a scheme if it wasn't passed.", () => {
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });

        check.ok(labyrinth.scheme instanceof Array);
        check.ok(labyrinth.scheme[0] instanceof Array);
        check.ok(Object.values(Cell).includes(labyrinth.scheme[0][0]));
      });

      test('generate a scheme only once on creation', () => {
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });

        check.ok(labyrinth.scheme);
        check.deepEqual(labyrinth.scheme, labyrinth.scheme);
      });
    });

    describe('gates', () => {
      test('provides coordinates of gates', () => {
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });

        check.ok(labyrinth.gates);
        check.deepEqual(labyrinth.gates, [gatePoints.entry, gatePoints.exit]);
      });

      test('a new gate should be on scheme', () => {
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });

        labyrinth.addGate(gatePoints.additionalOne);

        check.equal(
          labyrinth.scheme[gatePoints.additionalOne.y][
            gatePoints.additionalOne.x
          ],
          Cell.GATE,
        );
        check.deepEqual(labyrinth.gates, [
          gatePoints.entry,
          gatePoints.exit,
          gatePoints.additionalOne,
        ]);
      });

      test("remove gate from the scheme and the gate's lists", () => {
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });

        const removedGates = labyrinth.removeGate(labyrinth.gates[0]);

        check.equal(
          labyrinth.scheme[removedGates.y][removedGates.x],
          Cell.WALL,
        );
        check.ok(!labyrinth.gates.includes(removedGates));
      });

      test(`gate can be added only near "${Cell.FLOOR}" cell`, () => {
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });

        check.throws(
          () => {
            labyrinth.addGate(gatePoints.uneasy);
          },
          {
            message: `(${gatePoints.uneasy.x},${gatePoints.uneasy.y}) can't be supplied without connection to ${Cell.FLOOR}`,
          },
        );
      });

      test(`can remove only existed gate`, () => {
        const labyrinth = new Labyrinth({
          name: 'name',
          algorithm: mockAlgorithm,
        });

        check.throws(() => {
          labyrinth.removeGate(gatePoints.uneasy);
        });

        check.doesNotThrow(() => {
          labyrinth.removeGate(gatePoints.entry);
        });
        check.equal(
          labyrinth.scheme[gatePoints.entry.y][gatePoints.entry.x],
          Cell.WALL,
        );
      });
    });
  });
});
