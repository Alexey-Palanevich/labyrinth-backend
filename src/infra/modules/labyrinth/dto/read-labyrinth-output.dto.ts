import { ApiProperty } from '@nestjs/swagger';
import { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

import type { ICoordinate } from 'domain/labyrinth/boundaries/entities/ICoordinate';
import type { IReadLabyrinthUseCaseOutputDto } from 'domain/labyrinth/boundaries/use-cases/IReadLabyrinthUseCase';

export class ReadLabyrinthOutputDto implements IReadLabyrinthUseCaseOutputDto {
  @ApiProperty({
    description: 'Labyrinth name',
  })
  name: string;

  @ApiProperty({
    description: "Labyrinth's schema",
  })
  scheme: IScheme;

  @ApiProperty({
    description: 'Coordinates of gates inside labyrinth',
  })
  gates: ICoordinate[];
}
