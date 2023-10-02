import { Module } from '@nestjs/common';
import { LabyrinthModule } from 'infra/labyrinth/labyrinth.module';

@Module({
  imports: [LabyrinthModule],
})
export class AppModule {}
