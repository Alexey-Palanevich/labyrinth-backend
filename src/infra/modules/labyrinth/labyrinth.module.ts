import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MockedAlgorithmRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedAlgorithmRepositoryFactory';
import { CreateLabyrinthUseCase } from 'domain/labyrinth/core/use-cases/CreateLabyrinthUseCase';
import { ReadLabyrinthUseCase } from 'domain/labyrinth/core/use-cases/ReadLabyrinthUseCase';
import { REPOSITORIES, USE_CASES } from 'infra/common/DI';
import {
  LabyrinthEntity,
  LabyrinthEntitySchema,
} from 'infra/modules/labyrinth/entities/labyrinth.entity';
import { LabyrinthRepository } from 'infra/modules/labyrinth/repository/labyrinth.repository';

import { LabyrinthController } from './controllers/labyrinth.controller';

import type { ILabyrinthRepository } from 'domain/labyrinth/boundaries/repositories/ILabyrinthRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LabyrinthEntity.name, schema: LabyrinthEntitySchema },
    ]),
  ],
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
          {
            create(): ILabyrinthRepository {
              return rep;
            },
          },
        );
      },
      inject: [REPOSITORIES.ILabyrinthRepository],
    },
    {
      provide: USE_CASES.IReadLabyrinthUseCase,
      useFactory: (rep) =>
        new ReadLabyrinthUseCase({
          create(): ILabyrinthRepository {
            return rep;
          },
        }),
      inject: [REPOSITORIES.ILabyrinthRepository],
    },
  ],
})
export class LabyrinthModule {}
