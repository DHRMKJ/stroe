import {
  Body,
  Controller,
  Injectable,
  Ip,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EntityService } from '../../core/entity/entity.service';
import { AccountSessionService } from './account-session.service';
import { AccountService } from './account.service';
import { JwtProvider } from '../../core';

@Injectable()
@Controller()
export class AccountController {
  constructor(
    private readonly em: EntityService,
    private readonly accountService: AccountService,
    private readonly accountSessionService: AccountSessionService,
    private readonly jwtService: JwtProvider,
  ) {}

  @Post('/auth/discord')
  async Register(@Ip() ip, @Body() body: { code: string }) {
    const { code } = body;
    const em = this.em.getManager();
    const account = await em.transaction(async () => {
      return await this.accountService.createAccount(em, code);
    });
    if (!account) {
      throw new UnprocessableEntityException('Error: Can not create account.');
    }

    const accessToken = await em.transaction(async () => {
      const session = await this.accountSessionService.createNewSession(em, {
        account,
        ipAddress: ip,
      });
      return this.jwtService.createAccessToken({
        accountSessionId: session.id,
      });
    });
    return { accessToken };
  }
}
