import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserDto } from './user.dto';
import { UserCreationDto } from './user-creation.dto';
import { PaginatorFilterDto } from '../common/paginator-filter.dto';

import { IAuthUser } from '../auth/auth.service';
import AbstractUserService from 'src/domain/user/abstract-user.service';

import { IPaginator } from 'src/domain/common/paginator.interface';
import AbstractUserRepository from 'src/domain/user/abstract-user.repository';
import { Role } from 'src/domain/user/role.enum';
import { AuthPasswordService } from '../auth/auth-password.service';

@Injectable()
export class UserService extends AbstractUserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly repository: AbstractUserRepository,
    private readonly authPasswordService: AuthPasswordService,
  ) {
    super();
  }

  async create(dto: UserCreationDto): Promise<UserDto> {
    try {
      dto.createdBy = '65282fbb418998f093e06454';
      dto.updatedBy = '65282fbb418998f093e06454';
      dto.password = await this.authPasswordService.hashPassword(dto.password);
      const user = await this.repository.create(dto);
      return plainToInstance(UserDto, user, {
        excludePrefixes: ['__'],
        groups: [Role.ADMIN],
      });
    } catch (error) {
      this.logger.error(
        `error on ${UserService.name} | method create`,
        error['message'],
      );
      throw error;
    }
  }

  async list(
    paginator: PaginatorFilterDto,
    authUser: IAuthUser,
  ): Promise<IPaginator<UserDto>> {
    try {
      const usersPaginated = await this.repository.list(paginator);
      const users = usersPaginated.documents.map((user) => user);
      const usersFiltered = plainToInstance(UserDto, users, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
      return { ...usersPaginated, documents: usersFiltered };
    } catch (error) {
      this.logger.error(`error on ${UserService.name} | method list`, error);
      throw error;
    }
  }

  async findOneByKey(
    key: string,
    value: unknown,
    authUser: IAuthUser,
  ): Promise<UserDto> {
    try {
      const user = await this.repository.findOneByKey(key, value);
      const userFiltered = plainToInstance(UserDto, user, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
      return userFiltered;
    } catch (error) {
      this.logger.error(
        `error on ${UserService.name} | method findOneByKey | key: ${key}, value: ${value}`,
        error,
      );
      throw error;
    }
  }
}
