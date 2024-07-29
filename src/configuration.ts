import { InternalServerErrorException } from '@nestjs/common';

export type Configuration = {
  ENV: string; // TODO: type this as 'development' | 'production' | 'test'
  PORT: number;

  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  JWT_SECRET: string;

  GOOGLE_AUTH_CLIENT_ID: string;
  GOOGLE_AUTH_CLIENT_SECRET: string;
};

export function configuration(): Configuration {
  if (
    !process.env.GOOGLE_AUTH_CLIENT_ID ||
    !process.env.GOOGLE_AUTH_CLIENT_SECRET
  ) {
    throw new InternalServerErrorException(
      'GOOGLE_AUTH_CLIENT_ID and GOOGLE_AUTH_CLIENT_SECRET must be set',
    );
  }

  return {
    ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT) || 3000,

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT) || 5432,
    DB_USER: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DB_NAME: process.env.DB_NAME || 'postgres',

    JWT_SECRET: process.env.JWT_SECRET || 'jwt-secret',

    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  };
}
