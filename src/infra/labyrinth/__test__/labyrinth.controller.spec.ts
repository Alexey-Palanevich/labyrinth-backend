import { Test } from '@nestjs/testing';

import { LabyrinthController } from '../labyrinth.controller';

import type { TestingModule } from '@nestjs/testing';

describe('LabyrinthController', () => {
  let controller: LabyrinthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabyrinthController],
    }).compile();

    controller = module.get<LabyrinthController>(LabyrinthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
