import { PartialType } from '@nestjs/mapped-types';

import { CreateLabyrinthDto } from './create-labyrinth.dto';

export class UpdateLabyrinthDto extends PartialType(CreateLabyrinthDto) {}
