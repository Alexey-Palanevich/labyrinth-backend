import {
  Controller,
  Post,
  Body,
  Inject,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICreateLabyrinthUseCase } from 'domain/labyrinth/boundaries/use-cases/ICreateLabyrinthUseCase';
import { IReadLabyrinthUseCase } from 'domain/labyrinth/boundaries/use-cases/IReadLabyrinthUseCase';
import { USE_CASES } from 'infra/labyrinth/DI';
import { CreateLabyrinthOutputDto } from 'infra/labyrinth/dto/create-labyrinth-output.dto';
import { ReadLabyrinthOutputDto } from 'infra/labyrinth/dto/read-labyrinth-output.dto';

import { CreateLabyrinthInputDto } from './dto/create-labyrinth-input.dto';

import type { ICreateLabyrinthUseCaseOutputDto } from 'domain/labyrinth/boundaries/use-cases/ICreateLabyrinthUseCase';
import type { IReadLabyrinthUseCaseOutputDto } from 'domain/labyrinth/boundaries/use-cases/IReadLabyrinthUseCase';

@ApiTags('Labyrinth')
@Controller('labyrinth')
export class LabyrinthController {
  constructor(
    @Inject(USE_CASES.ICreateLabyrinthUseCase)
    private readonly createLabyrinthUseCase: ICreateLabyrinthUseCase,
    @Inject(USE_CASES.IReadLabyrinthUseCase)
    private readonly readLabyrinthUseCase: IReadLabyrinthUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a labyrinth and save it in the memory' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateLabyrinthOutputDto,
  })
  async create(
    @Body() createLabyrinthInputDTO: CreateLabyrinthInputDto,
  ): Promise<CreateLabyrinthOutputDto> {
    return this.createLabyrinthUseCase
      .execute(createLabyrinthInputDTO)
      .then(this.toCreateLabyrinthOutputDto);
  }

  // TODO: investigate how to change status code for null response without access to framework
  @Get(':name')
  @ApiOperation({ summary: 'Find labyrinth or return null' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ReadLabyrinthOutputDto,
  })
  async findOne(
    @Param('name') name: string,
  ): Promise<ReadLabyrinthOutputDto | null> {
    return this.readLabyrinthUseCase
      .execute(name)
      .then(this.toReadLabyrinthOutputDto);
  }

  private toCreateLabyrinthOutputDto(
    output: ICreateLabyrinthUseCaseOutputDto,
  ): CreateLabyrinthOutputDto {
    return {
      name: output.name,
      scheme: output.scheme,
      gates: output.gates,
    };
  }

  private toReadLabyrinthOutputDto(
    output: IReadLabyrinthUseCaseOutputDto | null,
  ): ReadLabyrinthOutputDto | null {
    return output
      ? {
          name: output.name,
          scheme: output.scheme,
          gates: output.gates,
        }
      : null;
  }
}
