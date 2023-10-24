import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'infra/db/db.module';
import { LabyrinthModule } from 'infra/modules/labyrinth/labyrinth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DbModule,
    LabyrinthModule,
  ],
})
export class AppModule {}
