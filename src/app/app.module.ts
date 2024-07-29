import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from '../configuration';
import { AuthModule, EntityModule } from '../core';
import { dataSource } from '../ormconfig';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AccountModule } from '../features/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/graphql',
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSource.options,
      retryAttempts: 10,
      retryDelay: 3000,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      toRetry: (err: any) => true,
      autoLoadEntities: true,
      keepConnectionAlive: false,
      verboseRetryLog: false,
    }),

    AuthModule,
    EntityModule,

    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppResolver],
})
export class AppModule {}
