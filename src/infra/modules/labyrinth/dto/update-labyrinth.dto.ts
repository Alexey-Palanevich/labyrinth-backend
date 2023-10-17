import { PartialType } from '@nestjs/mapped-types';

import { CreateLabyrinthInputDto } from './create-labyrinth-input.dto';

export class UpdateLabyrinthDto extends PartialType(CreateLabyrinthInputDto) {}
