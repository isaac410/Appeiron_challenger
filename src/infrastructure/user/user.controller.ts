import {
  Get,
  Body,
  Post,
  Query,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UserDto } from 'src/application/user/user.dto';
import { UserSwaggerDto } from 'src/application/user/user-swagger.dto';
import { UserCreationDto } from 'src/application/user/user-creation.dto';
import { UserPaginatorDto } from 'src/application/user/user-paginator.dto';
import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';

import { IAuthUser } from 'src/application/auth/auth.service';
import AbstractUserService from 'src/domain/user/abstract-user.service';

import { Public } from 'src/application/auth/public.decorator';
import { AuthUser } from 'src/application/user/auth-user.decorator';

import { IPaginator } from 'src/domain/common/paginator.interface';
import { Role } from 'src/domain/user/role.enum';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private service: AbstractUserService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create a new user' })
  @ApiResponse({
    type: UserDto,
    status: HttpStatus.CREATED,
    description: 'the user has been successfully created',
  })
  async create(@Body() dto: UserSwaggerDto): Promise<UserDto> {
    const newUser: UserCreationDto = plainToInstance(UserCreationDto, dto, {
      groups: [Role.ADMIN],
    });
    return this.service.create(newUser);
  }

  @Get()
  @ApiOperation({ summary: 'get user list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'the users has been successfully fetched.',
    type: UserPaginatorDto,
  })
  async list(
    @Query() paginator: PaginatorFilterDto,
    @AuthUser() authUser: IAuthUser,
  ): Promise<IPaginator<UserDto>> {
    return this.service.list(paginator, authUser);
  }
}
