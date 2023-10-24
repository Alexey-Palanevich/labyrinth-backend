import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const DB_CONNECTION = Symbol.for('DB');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const user = configService.get('MONGO_NON_ROOT_USERNAME');
        const password = configService.get('MONGO_NON_ROOT_PASSWORD');
        const host = configService.get('MONGO_DB_HOST');
        const port = configService.get('MONGO_DB_PORT');
        const db = configService.get('MONGO_INITDB_DATABASE');

        return {
          uri: `mongodb://${user}:${password}@${host}:${port}/${db}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      // TODO: think how to implement SAGA/REPOSITORY pattern
      provide: DB_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        const user = configService.get('MONGO_NON_ROOT_USERNAME');
        const password = configService.get('MONGO_NON_ROOT_PASSWORD');
        const host = configService.get('MONGO_DB_HOST');
        const port = configService.get('MONGO_DB_PORT');
        const db = configService.get('MONGO_INITDB_DATABASE');

        await mongoose.connect(
          `mongodb://${user}:${password}@${host}:${port}/${db}`,
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [DB_CONNECTION, MongooseModule],
})
export class DbModule {}
