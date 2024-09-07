import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.scheman';
import { UserController } from './user.controller';

import { UserRepository } from './user.repository';
import AbstractUserRepository from 'src/domain/user/abstract-user.repository';

import { UserService } from 'src/application/user/user.service';
import AbstractUserService from 'src/domain/user/abstract-user.service';
import { AuthPasswordService } from 'src/application/auth/auth-password.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    AuthPasswordService,
    { useClass: UserService, provide: AbstractUserService },
    { useClass: UserRepository, provide: AbstractUserRepository },
  ],
  exports: [
    { useClass: UserService, provide: AbstractUserService },
    { useClass: UserRepository, provide: AbstractUserRepository },
  ],
})
export class UserModule {}
