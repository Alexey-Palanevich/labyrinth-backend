import { Injectable } from '@nestjs/common';
import { Inject } from 'infra/common/Inject';
import { DB_CONNECTION } from 'infra/db/db.module';
import { PoolClient } from 'pg';

@Injectable()
export class LabyrinthRepository {
  constructor(@Inject(DB_CONNECTION) private dbConnection: PoolClient) {}

  async find() {
    const result = await this.dbConnection.query('SELECT * FROM "pg_catalog";');
    console.log(result);
  }
}
