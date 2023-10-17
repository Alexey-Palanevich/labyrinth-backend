import { MockedLabyrinthRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedLabyrinthRepositoryFactory';
import { mockedAlgorithm } from 'domain/labyrinth/__test__/__mock__/MockedMazeAlgorithm';
import { Labyrinth } from 'domain/labyrinth/core/entities/Labyrinth';
import { ReadLabyrinthUseCase } from 'domain/labyrinth/core/use-cases/ReadLabyrinthUseCase';
import assert from 'node:assert';
import { describe, test, beforeEach } from 'node:test';

describe('ReadLabyrinthUseCase', () => {
  const readLabyrinthUseCase = new ReadLabyrinthUseCase(
    new MockedLabyrinthRepositoryFactory(),
  );

  const EXISTED_LABYRINTH_NAME = 'Labyrinth One';
  beforeEach(() => {
    MockedLabyrinthRepositoryFactory.inMemory[EXISTED_LABYRINTH_NAME] =
      new Labyrinth({
        name: EXISTED_LABYRINTH_NAME,
        algorithm: mockedAlgorithm,
      });
  });

  test('name should be passed', async () => {
    await assert.rejects(
      async () => {
        // @ts-ignore: Check Runtime validation
        await readLabyrinthUseCase.execute();
      },
      { message: "Name isn't provided." },
    );
  });

  test("return null if labyrinth doesn't exist", async () => {
    const NON_EXISTED_LABYRINTH_NAME = 'Labyrinth Two';

    const labyrinth = await readLabyrinthUseCase.execute(
      NON_EXISTED_LABYRINTH_NAME,
    );

    assert.equal(labyrinth, null);
  });

  test('return a labyrinth if it exists', async () => {
    const labyrinth = await readLabyrinthUseCase.execute(
      EXISTED_LABYRINTH_NAME,
    );

    assert.deepStrictEqual(
      labyrinth,
      MockedLabyrinthRepositoryFactory.inMemory[EXISTED_LABYRINTH_NAME],
    );
  });
});
