import { AvailableAlgorithms } from 'domain/algorithms/AvailableAlgorithms';
import { MockedAlgorithmRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedAlgorithmRepositoryFactory';
import { MockedLabyrinthRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedLabyrinthRepositoryFactory';
import { CreateLabyrinthUseCase } from 'domain/labyrinth/core/use-cases/CreateLabyrinthUseCase';
import assert from 'node:assert';
import { describe, test, afterEach } from 'node:test';

const name = 'Labyrinth Name';
const algorithm = AvailableAlgorithms.KRUSKAL;

describe('CreateLabyrinthUseCase', () => {
  const createLabyrinthUseCase = new CreateLabyrinthUseCase(
    new MockedAlgorithmRepositoryFactory(),
    new MockedLabyrinthRepositoryFactory(),
  );

  afterEach(() => {
    for (const key of Object.keys(MockedLabyrinthRepositoryFactory.inMemory)) {
      delete MockedLabyrinthRepositoryFactory.inMemory[key];
    }
  });

  test('name should be passed', async () => {
    await assert.rejects(
      async () => {
        // @ts-ignore: Check Runtime validation
        await createLabyrinthUseCase.execute({});
      },
      { message: "Name isn't provided." },
    );

    await assert.doesNotReject(() =>
      createLabyrinthUseCase.execute({
        name,
        algorithm,
      }),
    );
  });

  test('algorithm should be passed', async () => {
    await assert.rejects(
      async () => {
        // @ts-ignore: Check Runtime validation
        await createLabyrinthUseCase.execute({ name });
      },
      { message: "Algorithm isn't provided." },
    );
    await assert.rejects(
      async () => {
        // @ts-ignore: Check Runtime validation
        await createLabyrinthUseCase.execute({ name, algorithm: null });
      },
      { message: "Algorithm isn't provided." },
    );
  });

  test('throws error if choice non-existed algorithm', async () => {
    const NON_EXISTED_ALGORITHM = 'NON_EXISTED_ALGORITHM';
    await assert.rejects(
      async () => {
        await createLabyrinthUseCase.execute({
          name,
          // @ts-ignore: Check Runtime validation
          algorithm: NON_EXISTED_ALGORITHM,
        });
      },
      { message: "Algorithm isn't implemented." },
    );

    await assert.doesNotReject(async () => {
      await createLabyrinthUseCase.execute({
        name,
        algorithm,
      });
    });
  });

  test('return new labyrinth', async () => {
    const labyrinth = await createLabyrinthUseCase.execute({
      name,
      algorithm,
    });

    assert.ok(labyrinth);
    assert.ok(labyrinth.name);
    assert.ok(labyrinth.scheme);
    assert.ok(labyrinth.gates);
  });

  test('save labyrinth', async () => {
    const labyrinth = await createLabyrinthUseCase.execute({ name, algorithm });

    assert.deepEqual(
      labyrinth,
      MockedLabyrinthRepositoryFactory.inMemory[labyrinth.name],
    );
  });

  test('throws error if labyrinth already exists', async () => {
    await createLabyrinthUseCase.execute({ name, algorithm });

    await assert.rejects(
      async () => {
        await createLabyrinthUseCase.execute({ name, algorithm });
      },
      { message: 'Labyrinth with given name already exists.' },
    );
  });
});
