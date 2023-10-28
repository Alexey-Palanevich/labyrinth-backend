import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AvailableAlgorithms } from 'domain/algorithms/AvailableAlgorithms';
import { MockedAlgorithmRepositoryFactory } from 'domain/labyrinth/__test__/__mock__/MockedAlgorithmRepositoryFactory';
import { Cell } from 'domain/labyrinth/boundaries/entities/IScheme';
import { Labyrinth } from 'domain/labyrinth/core/entities/Labyrinth';
import { LabyrinthEntity } from 'infra/modules/labyrinth/entities/labyrinth.entity';
import { Model } from 'mongoose';

import type { ICoordinate } from 'domain/labyrinth/boundaries/entities/ICoordinate';
import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';
import type { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';
import type { ILabyrinthRepository } from 'domain/labyrinth/boundaries/repositories/ILabyrinthRepository';

@Injectable()
export class LabyrinthRepository implements ILabyrinthRepository {
  constructor(
    @InjectModel(LabyrinthEntity.name)
    private labyrinthEntity: Model<LabyrinthEntity>,
  ) {}

  async save(entity: Partial<ILabyrinth>): Promise<ILabyrinth> {
    const labyrinthEntity = await new this.labyrinthEntity({
      name: entity.name,
      gates: entity.gates,
      scheme: entity.scheme,
    }).save();

    return {
      get name(): string {
        return labyrinthEntity.name;
      },
      get gates(): ICoordinate[] {
        return labyrinthEntity.gates;
      },
      get scheme(): IScheme {
        return labyrinthEntity.scheme;
      },
      addGate(point: ICoordinate) {},
      removeGate(point: ICoordinate) {},
    };
  }

  async find(entity: Partial<ILabyrinth>): Promise<ILabyrinth[]> {
    // return this.labyrinthEntity.find(entity).exec();
    return [];
  }

  async findOneByName(name: string): Promise<ILabyrinth | null> {
    const data = await this.labyrinthEntity.findOne({ name }).exec();

    if (!data) return null;

    return new Labyrinth({
      name: data.name,
      scheme: data.scheme,
      // TODO: think how to build entity;
      algorithm: new MockedAlgorithmRepositoryFactory()
        .create()
        .find(AvailableAlgorithms.KRUSKAL),
    });
  }
}
