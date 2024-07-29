import { Module } from '@nestjs/common';
import { GoogleAuthProvider, JwtProvider } from './providers';

@Module({
  providers: [GoogleAuthProvider, JwtProvider],
  exports: [GoogleAuthProvider, JwtProvider],
})
export class AuthModule {}
