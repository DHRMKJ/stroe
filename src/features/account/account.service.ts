import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AccountEntity } from '../../core';

@Injectable()
export class AccountService {
  async getAccountByGoogleUserId(
    em: EntityManager,
    googleUserId: string,
  ): Promise<AccountEntity | null> {
    return await em.findOneBy(AccountEntity, { googleUserId });
  }

  async createAccount(
    em: EntityManager,
    { email, googleUserId }: { googleUserId: string; email: string },
  ): Promise<AccountEntity | null> {
    const newAccount = new AccountEntity().init({ email, googleUserId });
    return await em.save(newAccount);
  }
}
