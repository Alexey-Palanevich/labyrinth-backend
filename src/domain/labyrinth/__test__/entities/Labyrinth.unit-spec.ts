import { mockedAlgorithm } from 'domain/labyrinth/__test__/__mock__/MockedMazeAlgorithm';
import { Cell } from 'domain/labyrinth/boundaries/entities/IScheme';
import { Labyrinth } from 'domain/labyrinth/core/entities/Labyrinth';
import assert from 'node:assert';
import { describe, test } from 'node:test';

import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

const name = 'Labyrinth name';
const GATE_POINTS = {
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
  uneasy: {
    x: 3,
    y: 3,
  },

  outside: {
    x: 1000,
    y: 1000,
  },
};

describe('Labyrinth Entity', () => {
  describe('Attributes:', () => {
    describe('name', () => {
      test('has name', () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        assert.ok(labyrinth.name);
      });
    });

    describe('algorithm', () => {
      test('has maze generation algorithm', () => {
        new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
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
          name,
          algorithm: mockedAlgorithm,
          scheme,
        });

        assert.deepEqual(scheme, labyrinth.scheme);
      });

      test("generate a scheme if it wasn't passed", () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        assert.ok(labyrinth.scheme instanceof Array);
        assert.ok(labyrinth.scheme[0] instanceof Array);
        assert.ok(labyrinth.scheme[0]?.[0]);
        assert.ok(Object.values(Cell).includes(labyrinth.scheme[0]![0]));
      });

      test('generate a scheme only once on creation', () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        assert.ok(labyrinth.scheme);
        assert.deepEqual(labyrinth.scheme, labyrinth.scheme);
      });
    });

    describe('gates', () => {
      test('provides coordinates of gates', () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        assert.ok(labyrinth.gates);
        assert.deepEqual(labyrinth.gates, [
          GATE_POINTS.entry,
          GATE_POINTS.exit,
        ]);
      });

      test('a new gate should be on the scheme', () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        labyrinth.addGate(GATE_POINTS.additionalOne);

        assert.equal(
          labyrinth.scheme[GATE_POINTS.additionalOne.y]?.[
            GATE_POINTS.additionalOne.x
          ],
          Cell.GATE,
        );
        assert.deepEqual(labyrinth.gates, [
          GATE_POINTS.entry,
          GATE_POINTS.exit,
          GATE_POINTS.additionalOne,
        ]);
      });

      test("remove gate from the scheme, and the gate's lists", () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        const removedGates = labyrinth.removeGate(labyrinth.gates[0]!);

        assert.ok(removedGates);
        assert.equal(
          labyrinth.scheme[removedGates.y]?.[removedGates.x],
          Cell.WALL,
        );
        assert.ok(!labyrinth.gates.includes(removedGates!));
      });

      test(`removed gate is replaced by ${Cell.WALL}`, () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        labyrinth.removeGate(GATE_POINTS.entry);
        assert.equal(
          labyrinth.scheme[GATE_POINTS.entry.y]?.[GATE_POINTS.entry.x],
          Cell.WALL,
        );
      });
    });
  });

  describe('Validation', () => {
    describe('name', () => {
      test("throw an error if name isn't provided", () => {
        assert.throws(
          () => {
            // @ts-ignore: Check runtime validation
            new Labyrinth({ name: null, algorithm: mockedAlgorithm });
          },
          { message: "Name isn't provided." },
        );

        assert.throws(
          () => {
            // @ts-ignore: Check runtime validation
            new Labyrinth({ name: undefined, algorithm: mockedAlgorithm });
          },
          { message: "Name isn't provided." },
        );

        assert.doesNotThrow(
          () => new Labyrinth({ name, algorithm: mockedAlgorithm }),
        );
      });

      test('throw an error if name length less than two symbols', () => {
        assert.throws(
          () => {
            new Labyrinth({ name: 'l', algorithm: mockedAlgorithm });
          },
          { message: 'Name is too short.' },
        );

        assert.doesNotThrow(() => {
          new Labyrinth({ name: 'la', algorithm: mockedAlgorithm });
        });
        assert.doesNotThrow(() => {
          new Labyrinth({ name, algorithm: mockedAlgorithm });
        });
      });
    });

    describe('scheme', () => {
      test("throw an error if a scheme isn't array", () => {
        const NOT_ARRAY = 'NOT_ARRAY';

        assert.throws(
          () => {
            new Labyrinth({
              name: 'Labyrinth',
              algorithm: mockedAlgorithm,
              // @ts-ignore: Check runtime validation
              scheme: NOT_ARRAY,
            });
          },
          { message: "Scheme isn't valid." },
        );
      });

      test("throw an error if a scheme hasn't rows", () => {
        // @ts-ignore: Check Runtime validation
        const ARRAY_WITHOUT_ROWS: IScheme = [];

        assert.throws(
          () => {
            new Labyrinth({
              name: 'Labyrinth',
              algorithm: mockedAlgorithm,
              scheme: ARRAY_WITHOUT_ROWS,
            });
          },
          { message: "Scheme isn't valid." },
        );
      });

      test("throw an error if scheme's rows don't have cells", () => {
        // @ts-ignore: Check Runtime validation
        const ARRAY_WITH_ROWS_WITHOUT_CELLS: IScheme = [[], [], []];

        assert.throws(
          () => {
            new Labyrinth({
              name: 'Labyrinth',
              algorithm: mockedAlgorithm,
              scheme: ARRAY_WITH_ROWS_WITHOUT_CELLS,
            });
          },
          { message: "Scheme isn't valid." },
        );
      });

      test('throw an error if cells are an unknown type', () => {
        const SCHEME_WITH_UNKNOWN_CELLS: IScheme = [
          // @ts-ignore: Check Runtime validation
          ['UNKNOWN_CELL'],
          ['UNKNOWN_CELL'],
          ['UNKNOWN_CELL'],
        ];

        assert.throws(
          () => {
            new Labyrinth({
              name: 'Labyrinth',
              algorithm: mockedAlgorithm,
              scheme: SCHEME_WITH_UNKNOWN_CELLS,
            });
          },
          { message: "Scheme isn't valid." },
        );
      });

      test('take valid scheme', () => {
        const VALID_SCHEME: IScheme = [
          [Cell.WALL, Cell.GATE, Cell.WALL],
          [Cell.WALL, Cell.FLOOR, Cell.WALL],
          [Cell.WALL, Cell.GATE, Cell.WALL],
        ];

        assert.doesNotThrow(() => {
          new Labyrinth({
            name: 'Labyrinth',
            algorithm: mockedAlgorithm,
            scheme: VALID_SCHEME,
          });
        });
      });
    });

    describe('gates', () => {
      test('point for a new gate should be inside scheme', () => {
        const labyrinth = new Labyrinth({ name, algorithm: mockedAlgorithm });

        assert.throws(() => labyrinth.addGate(GATE_POINTS.outside), {
          message: 'Point is outside a scheme.',
        });
        assert.doesNotThrow(() => labyrinth.addGate(GATE_POINTS.additionalOne));
      });

      test(`gate can be added only near "${Cell.FLOOR}" cell`, () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        assert.throws(
          () => {
            labyrinth.addGate(GATE_POINTS.uneasy);
          },
          {
            message: `${Cell.GATE} can't be supplied without connection to ${Cell.FLOOR}.`,
          },
        );
      });

      test('can remove only an existed gate', () => {
        const labyrinth = new Labyrinth({
          name,
          algorithm: mockedAlgorithm,
        });

        assert.throws(() => {
          labyrinth.removeGate(GATE_POINTS.uneasy);
        });
        assert.doesNotThrow(() => {
          labyrinth.removeGate(GATE_POINTS.entry);
        });
      });
    });
  });
});
