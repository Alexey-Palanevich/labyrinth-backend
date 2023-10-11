import { Module } from '@nestjs/common';
import { MockedAlgorithmRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedAlgorithmRepositoryFactory';
import { MockedLabyrinthRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedLabyrinthRepositoryFactory';
import { CreateLabyrinthUseCase } from 'domain/labyrinth/core/use-cases/CreateLabyrinthUseCase';
import { ReadLabyrinthUseCase } from 'domain/labyrinth/core/use-cases/ReadLabyrinthUseCase';
import { USE_CASES } from 'infra/labyrinth/DI';

import { LabyrinthController } from './labyrinth.controller';

@Module({
  controllers: [LabyrinthController],
  providers: [
    {
      provide: USE_CASES.ICreateLabyrinthUseCase,
      useFactory: () =>
        new CreateLabyrinthUseCase(
          // TODO: refactor
          new MockedAlgorithmRepositoryFactory(),
          new MockedLabyrinthRepositoryFactory(),
        ),
    },
    {
      provide: USE_CASES.IReadLabyrinthUseCase,
      useFactory: () =>
        // TODO: refactor
        new ReadLabyrinthUseCase(new MockedLabyrinthRepositoryFactory()),
    },
  ],
})
export class LabyrinthModule {}
