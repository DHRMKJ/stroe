import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ACCESS_TOKEN_VALIDITY_IN_HOURS } from '../../../common/constant';
import { Configuration } from '../../../configuration';

export type JwtPayload = {
  accountSessionId: string;
};

@Injectable()
export class JwtProvider {
  private issuer = 'flope-invoice-backend';
  private accessTokenSubject = 'access-token';

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService<Configuration>,
  ) {}

  private get secret() {
    return this.config.get('JWT_SECRET');
  }

  createAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, {
      issuer: this.issuer,
      expiresIn: `${ACCESS_TOKEN_VALIDITY_IN_HOURS}h`,
      subject: this.accessTokenSubject,
    });
  }

  validateAccessToken(token: string): JwtPayload {
    try {
      const { accountSessionId } = jwt.verify(token, this.secret, {
        issuer: this.issuer,
        subject: this.accessTokenSubject,
      }) as JwtPayload;
      return { accountSessionId };
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Access token expired');
      }
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid access token');
      }
      throw err;
    }
  }
}
