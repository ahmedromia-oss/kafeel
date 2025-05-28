import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
// For ES module environment, recreate __dirname

export const AppDataSource = new DataSource({

  host: process.env.host,
  type: 'mysql',
  username: process.env.DBuser,
  password: process.env.password,
  database: process.env.database,
  port: Number(process.env.port),

  entities: ['dist/src/**/*.model.js'],
  migrations: ['dist/src/migrations/*.js'],

  synchronize: false,
  extra: {
    ssl: false,
  },
});
