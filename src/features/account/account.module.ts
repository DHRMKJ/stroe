import { Module } from '@nestjs/common';
import { AuthModule, EntityModule } from '../../core';
import { AccountSessionService } from './account-session.service';
import { AccountService } from './account.service';
import { GoogleAuthMutation } from './google-auth.mutation';

@Module({
  imports: [EntityModule, AuthModule],
  providers: [GoogleAuthMutation, AccountService, AccountSessionService],
})
export class AccountModule {}
