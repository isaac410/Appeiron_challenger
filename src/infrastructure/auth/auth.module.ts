import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

import { AuthService } from 'src/application/auth/auth.service';
import { UserService } from 'src/application/user/user.service';
import AbstractUserService from 'src/domain/user/abstract-user.service';
import { AuthPasswordService } from 'src/application/auth/auth-password.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    AuthPasswordService,
    { useClass: UserService, provide: AbstractUserService },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
