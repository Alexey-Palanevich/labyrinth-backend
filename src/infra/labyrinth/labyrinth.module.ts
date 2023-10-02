import { Module } from '@nestjs/common';
import { Labyrinth } from 'domain/labyrinth/core/entities/Labyrinth';
import { LabyrinthUseCase } from 'domain/labyrinth/core/use-cases/LabyrinthUseCase';
import { LabyrinthSymbol } from 'infra/labyrinth/DI';
import {
  LabyrinthRepository,
  // LabyrinthRepositoryFactory,
} from 'infra/labyrinth/repository/LabyrinthRepositoryFactory';

import { LabyrinthController } from './labyrinth.controller';

@Module({
  controllers: [LabyrinthController],
  providers: [
    {
      provide: LabyrinthSymbol,
      useFactory: () =>
        new LabyrinthUseCase(
          (input) => new Labyrinth(input),
          // new LabyrinthRepositoryFactory(),
          { create: () => new LabyrinthRepository() },
        ),
    },
  ],
})
export class LabyrinthModule {}
