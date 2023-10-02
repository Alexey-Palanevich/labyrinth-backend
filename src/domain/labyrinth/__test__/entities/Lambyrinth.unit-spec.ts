import * as check from 'assert';
import { Labyrinth } from 'domain/labyrinth/core/entities/Labyrinth';
import { test, describe } from 'node:test';

describe('Labyrinth Entity', () => {
  test('should be defined', () => {
    check.ok(Labyrinth);
  });

  describe('Labyrinth attributes:', () => {
    const labyrinth = new Labyrinth('name');

    test('should have name', () => {
      check.ok(labyrinth.name);
    });
    test('name length should be more than one symbol.', () => {
      check.ok(labyrinth.name.length > 1);
    });
    test("couldn't write less than one symbol name.", () => {
      check.throws(() => {
        new Labyrinth('');
      });
    });
    //
    // test('should have scheme', () => {
    //   check.ok(labyrinth.scheme);
    // });
    // test('should have entrances', () => {
    //   check.ok(labyrinth.entrances);
    // });
    // test('should have traps', () => {
    //   check.ok(labyrinth.traps);
    // });
    // test('should have monsters', () => {
    //   check.ok(labyrinth.monsters);
    // });
    // test('should have treasures', () => {
    //   check.ok(labyrinth.treasures);
    // });
  });
});
