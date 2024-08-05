import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AccountEntity, AccountSessionEntity } from '../../core';

@Injectable()
export class AccountSessionService {
  async createNewSession(
    em: EntityManager,
    { account, ipAddress }: { account: AccountEntity; ipAddress: string },
  ): Promise<AccountSessionEntity> {
    await this.deleteAllExistingSessionsOfAccount(em, account);
    const newAccountSession = new AccountSessionEntity().init({
      account,
      ipAddress,
    });
    newAccountSession.loggedInAt = new Date();
    return await em.save(newAccountSession);
  }

  async deleteAllExistingSessionsOfAccount(
    em: EntityManager,
    account: AccountEntity,
  ) {
    const existingSessions = await em.findBy(AccountSessionEntity, { account });
    if (existingSessions) {
      await em.remove(existingSessions);
    }
  }
}
