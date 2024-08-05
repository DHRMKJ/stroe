import { EntityManager } from 'typeorm';
import { AccountEntity } from '../../core';
import { DiscordAuthProvider } from '../../core/auth/providers/discord-auth.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(private readonly discord: DiscordAuthProvider) {}

  async createAccount(em: EntityManager, code: string): Promise<AccountEntity> {
    const profile = await this.discord.getAccountFromProvider(code);
    const account = await this.getAccountById(em, { discordId: profile.id });
    if (account) {
      return account;
    }
    const newAccount = new AccountEntity().init(profile);
    return await em.save(newAccount);
  }

  async getAccountById(em: EntityManager, payload: { discordId: string }) {
    return await em.findOne(AccountEntity, {
      where: { discordId: payload.discordId },
    });
  }
}
