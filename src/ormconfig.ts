import 'dotenv/config';
import * as path from 'path';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  applicationName: 'study-room-of-epicness',
  migrationsTableName: 'migrations',

  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [
    path.join(__dirname, 'core', 'entity', 'entities', '*.*entity.js'),
  ],
  migrations: [path.join(__dirname, 'migrations', '*.js')],
  synchronize: false,

  connectTimeoutMS: 30000,
});
