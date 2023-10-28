import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IScheme } from 'domain/labyrinth/boundaries/entities/IScheme';

import type { ICoordinate } from 'domain/labyrinth/boundaries/entities/ICoordinate';
import type { ILabyrinth } from 'domain/labyrinth/boundaries/entities/ILabyrinth';

// TODO: complete fields
@Schema()
export class LabyrinthEntity implements Partial<ILabyrinth> {
  @Prop()
  name: string;

  @Prop(
    raw({
      x: { type: Number },
      y: { type: Number },
    }),
  )
  gates: ICoordinate[];

  @Prop()
  scheme: IScheme;
}

export const LabyrinthEntitySchema =
  SchemaFactory.createForClass(LabyrinthEntity);
