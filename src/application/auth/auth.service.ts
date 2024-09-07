import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserDto } from '../user/user.dto';
import { Role } from 'src/domain/user/role.enum';

import { AuthPasswordService } from './auth-password.service';
import AbstractUserService from 'src/domain/user/abstract-user.service';

export type Token = {
  user?: UserDto;
  access_token: string;
  refresh_token?: string;
};

export interface IAuthUser {
  role: Role;
  sub: string;
  email: string;
  refresh?: boolean;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: AbstractUserService,
    private authPasswordService: AuthPasswordService,
  ) {}

  async signIn(email: string, pass: string): Promise<Token> {
    // necessary to obtain a user email and compare it with the current user trying to log in
    const hardCodeAdminRole = { role: Role.ADMIN } as IAuthUser;

    const user = await this.usersService.findOneByKey(
      'email',
      email,
      hardCodeAdminRole,
    );

    if (!user) throw new UnauthorizedException('User does not exist');

    if (
      !(await this.authPasswordService.comparePassword(pass, user.password))
    ) {
      throw new UnauthorizedException();
    }

    const payloadToken: IAuthUser = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const refreshToken: IAuthUser = {
      sub: user.id,
      refresh: true,
      role: user.role,
      email: user.email,
    };

    delete user.password;

    const generatedToken: Token = {
      access_token: await this.jwtService.signAsync(payloadToken),
      refresh_token: await this.jwtService.signAsync(refreshToken, {
        expiresIn: '7d',
      }),
      user: user,
    };

    return generatedToken;
  }

  async refresh(refreshToken: string): Promise<Token> {
    try {
      if (!refreshToken)
        throw new UnauthorizedException('Refresh token not provided');

      const decodedToken = this.jwtService.verify(refreshToken);
      if (!decodedToken || !decodedToken.refresh)
        throw new Error('Invalid refresh token');

      const token: IAuthUser = {
        sub: decodedToken._id,
        role: decodedToken.roles,
        email: decodedToken.email,
      };

      const generatedToken = {
        access_token: await this.jwtService.signAsync(token),
      };

      return generatedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
