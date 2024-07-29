import { Req, UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AccountEntity,
  AccountSessionEntity,
  GoogleAuthProvider,
  JwtProvider,
} from '../../core';
import { EntityService } from '../../core/entity/entity.service';
import { AccountSessionService } from './account-session.service';
import { AccountService } from './account.service';
import { AccountLoginResponseV1 } from './response-types/AccountLoginResponse';
import { Request } from 'express';

@Resolver(() => AccountEntity)
export class GoogleAuthMutation {
  constructor(
    private readonly googleAuthProvider: GoogleAuthProvider,
    private readonly jwtProvider: JwtProvider,
    private readonly entity: EntityService,
    private readonly accountService: AccountService,
    private readonly accountSessionService: AccountSessionService,
  ) {}

  @Mutation(() => AccountLoginResponseV1)
  async loginWithGoogleAuthV1(
    @Args('googleAccessToken') googleAccessToken: string,
    @Req() req: Request,
  ): Promise<AccountLoginResponseV1> {
    const googleProfile =
      await this.googleAuthProvider.getGoogleProfile(googleAccessToken);

    let accountSession: AccountSessionEntity;
    await this.entity.getManager().transaction(async (em) => {
      const account = await this.accountService.getAccountByGoogleUserId(
        em,
        googleProfile.userId,
      );
      if (!account) {
        throw new UnprocessableEntityException(
          'No account found with this google account, please register first',
        );
      }

      accountSession = await this.accountSessionService.createNewSession(em, {
        account,
        ipAddress: req.ip,
      });
    });

    const accessToken = this.jwtProvider.createAccessToken({
      accountSessionId: accountSession.id,
    });
    return { accessToken };
  }

  @Mutation(() => AccountLoginResponseV1)
  async registerWithGoogleAuthV1(
    @Args('googleAccessToken') googleAccessToken: string,
    @Req() req: Request,
  ): Promise<AccountLoginResponseV1> {
    const { email, userId } =
      await this.googleAuthProvider.getGoogleProfile(googleAccessToken);

    let accountSession: AccountSessionEntity;
    await this.entity.getManager().transaction(async (em) => {
      const account = await this.accountService.createAccount(em, {
        googleUserId: userId,
        email,
      });
      accountSession = await this.accountSessionService.createNewSession(em, {
        account,
        ipAddress: req.ip,
      });
    });

    const accessToken = this.jwtProvider.createAccessToken({
      accountSessionId: accountSession.id,
    });
    return { accessToken };
  }
}
