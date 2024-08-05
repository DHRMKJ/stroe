import { Module } from '@nestjs/common';
import { GoogleAuthProvider, JwtProvider } from './providers';
import { DiscordAuthProvider } from './providers/discord-auth.provider';

@Module({
  providers: [GoogleAuthProvider, JwtProvider, DiscordAuthProvider],
  exports: [GoogleAuthProvider, JwtProvider, DiscordAuthProvider],
})
export class AuthModule {}
