import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../../configuration';

@Injectable()
export class DiscordAuthProvider {
  private BASE_URL = 'https://discord.com/api/v10';
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService<Configuration>,
  ) {}
  async getAccessToken(code: string) {
    const data = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3000/auth/discord',
    };

    const headers = new Headers();

    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set(
      'Authorization',
      'Basic ' +
        Buffer.from(
          this.config.get('DISCORD_AUTH_CLIENT_ID') +
            ':' +
            this.config.get('DISCORD_AUTH_CLIENT_SECRET'),
        ).toString('base64'),
    );

    try {
      const accessToken = await fetch(`${this.BASE_URL}/oauth2/token`, {
        method: 'POST',
        body: new URLSearchParams(data),
        headers,
      }).then(async (res) => await res.json());

      if (
        !accessToken.access_token ||
        !accessToken.token_type ||
        !accessToken.expires_in
      ) {
        throw new UnprocessableEntityException('Can not get user');
      }

      return accessToken;
    } catch (e) {
      console.log(e);
      throw new UnprocessableEntityException(
        'Can not get access token for discord',
        e,
      );
    }
  }

  async getDiscordProfile(accessToken: string) {
    try {
      const profile = await fetch(this.BASE_URL + '/users/@me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(async (res) => await res.json());
      if (!profile.verified) {
        throw new UnprocessableEntityException(
          'discord account email is not verified',
        );
      }
      if (!profile.email || !profile.id) {
        throw new UnprocessableEntityException('Invalid discord user');
      }
      return profile;
    } catch (e) {
      throw new UnprocessableEntityException('Can not get User', e);
    }
  }

  public async getAccountFromProvider(code: string) {
    const accessTokenObj = await this.getAccessToken(code);
    return await this.getDiscordProfile(accessTokenObj.access_token);
  }
}
