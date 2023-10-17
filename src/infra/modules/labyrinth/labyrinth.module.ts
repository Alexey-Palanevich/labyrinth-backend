import { Module } from '@nestjs/common';
import { MockedAlgorithmRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedAlgorithmRepositoryFactory';
import { MockedLabyrinthRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedLabyrinthRepositoryFactory';
import { CreateLabyrinthUseCase } from 'domain/labyrinth/core/use-cases/CreateLabyrinthUseCase';
import { ReadLabyrinthUseCase } from 'domain/labyrinth/core/use-cases/ReadLabyrinthUseCase';
import { REPOSITORIES, USE_CASES } from 'infra/common/DI';
import { DbModule } from 'infra/db/db.module';
import { LabyrinthRepository } from 'infra/modules/labyrinth/repository/labyrinth.repository';

import { LabyrinthController } from './controllers/labyrinth.controller';

@Module({
  imports: [DbModule],
  controllers: [LabyrinthController],
  providers: [
    {
      provide: REPOSITORIES.ILabyrinthRepository,
      // TODO: maybe use factory and remove Inject from repository constructor?
      useClass: LabyrinthRepository,
    },
    {
      provide: USE_CASES.ICreateLabyrinthUseCase,
      useFactory: (rep) => {
        console.log(rep);
        // TODO: manage db transaction
        return new CreateLabyrinthUseCase(
          // TODO: refactor
          new MockedAlgorithmRepositoryFactory(),
          new MockedLabyrinthRepositoryFactory(),
        );
      },
      inject: [REPOSITORIES.ILabyrinthRepository],
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
