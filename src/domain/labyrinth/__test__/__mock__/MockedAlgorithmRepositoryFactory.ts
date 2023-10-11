import { AvailableAlgorithms } from 'domain/algorithms/AvailableAlgorithms';
import { mockedAlgorithm } from 'domain/labyrinth/__test__/__mock__/MockedMazeAlgorithm';

import type {
  IAlgorithmRepository,
  IAlgorithmRepositoryFactory,
} from 'domain/algorithms/boundaries/repositories/IAlgorithmRepository';
import type { MazeAlgorithm } from 'domain/algorithms/MazeAlgorithm';

export class MockedAlgorithmRepositoryFactory
  implements IAlgorithmRepositoryFactory
{
  create(): IAlgorithmRepository {
    return new MockedAlgorithmRepository();
  }
}

class MockedAlgorithmRepository implements IAlgorithmRepository {
  find(name: string): MazeAlgorithm {
    if (name !== AvailableAlgorithms.KRUSKAL) {
      throw new Error("Algorithm isn't implemented.");
    }
    return mockedAlgorithm;
  }
}
