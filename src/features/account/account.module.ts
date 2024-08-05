import { Module } from '@nestjs/common';
import { AuthModule, EntityModule } from '../../core';
import { AccountSessionService } from './account-session.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [EntityModule, AuthModule],
  providers: [AccountSessionService, AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
