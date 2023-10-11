import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';

export interface IReadLabyrinthUseCase {
  execute(name: string): Promise<IReadLabyrinthUseCaseOutputDto | null>;
}

export interface IReadLabyrinthUseCaseOutputDto
  extends Pick<ILabyrinth, 'name' | 'scheme' | 'gates'> {}
