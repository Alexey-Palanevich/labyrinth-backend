import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export const DB_CONNECTION = Symbol.for('DB');

@Module({
  providers: [
    {
      provide: DB_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        return await new Pool({
          user: configService.get('DB_USER'),
          host: configService.get('DB_HOST'),
          database: configService.get('DB_NAME'),
          password: configService.get('DB_PASSWORD'),
          port: configService.get('DB_PORT'),
        }).connect();
      },
      inject: [ConfigService],
    },
  ],
  exports: [DB_CONNECTION],
})
export class DbModule {}
