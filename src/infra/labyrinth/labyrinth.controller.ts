import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { LabyrinthUseCase } from 'domain/labyrinth/core/use-cases/LabyrinthUseCase';
import { LabyrinthSymbol } from 'infra/labyrinth/DI';

import { CreateLabyrinthDto } from './dto/create-labyrinth.dto';

@Controller('labyrinth')
export class LabyrinthController {
  constructor(
    @Inject(LabyrinthSymbol)
    private readonly labyrinthUseCase: LabyrinthUseCase,
  ) {}

  @Post()
  create(@Body() createLabyrinthDto: CreateLabyrinthDto) {
    console.log('controller');
    return this.labyrinthUseCase.create(createLabyrinthDto);
    // return this.labyrinthService.create(createLabyrinthDto);
  }

  // @Get()
  // findAll() {
  //   this.labyrinthUseCase.create('tatakae');
  //   console.log('work!');
  //   return this.labyrinthService.findAll();
  // }
  //
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.labyrinthUseCase.read(name);
  }
  //
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLabyrinthDto: UpdateLabyrinthDto,
  // ) {
  //   return this.labyrinthService.update(+id, updateLabyrinthDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.labyrinthService.remove(+id);
  // }
}
