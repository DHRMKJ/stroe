import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, AccountSessionEntity } from './entities';
import { EntityService } from './entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, AccountSessionEntity])],
  providers: [EntityService],
  exports: [EntityService],
})
export class EntityModule {}
