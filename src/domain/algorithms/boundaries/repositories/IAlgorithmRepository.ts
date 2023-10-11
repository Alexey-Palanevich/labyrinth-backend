import type { MazeAlgorithm } from 'domain/algorithms/MazeAlgorithm';

export interface IAlgorithmRepository {
  find(name: string): MazeAlgorithm;
}

export interface IAlgorithmRepositoryFactory {
  create(): IAlgorithmRepository;
}
