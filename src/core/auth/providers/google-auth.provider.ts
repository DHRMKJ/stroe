import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../../configuration';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthProvider {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService<Configuration>,
  ) {}

  async getGoogleProfile(accessToken: string) {
    const client = this.getClient();
    const profile = await client.getTokenInfo(accessToken);
    if (!profile.email_verified) {
      throw new UnprocessableEntityException(
        'Google account email is not verified',
      );
    }
    if (!profile.email || !profile.user_id) {
      throw new UnprocessableEntityException('Invalid google user');
    }

    return { userId: profile.user_id, email: profile.email };
  }

  private getClient(): OAuth2Client {
    const clientId = this.config.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.config.get('GOOGLE_AUTH_CLIENT_SECRET');
    return new OAuth2Client(clientId, clientSecret);
  }
}
