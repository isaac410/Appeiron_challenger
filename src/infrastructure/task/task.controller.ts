import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
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

import { TaskDto } from 'src/application/task/task.dto';
import { TaskCreationDto } from 'src/application/task/task-creation.dto';
import { TaskUpdationDto } from 'src/application/task/task-updation.dto';

import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';

import { IAuthUser } from 'src/application/auth/auth.service';
import AbstractTaskService from 'src/domain/task/abstract-task.service';

import { AuthUser } from 'src/application/user/auth-user.decorator';

import { IPaginator } from 'src/domain/common/paginator.interface';

import { TaskSwaggerDto } from 'src/application/task/task-swagger.dto';
import { TaskPaginatorDto } from 'src/application/task/task-paginator.dto';
import { TaskStatus } from 'src/domain/task/task-status.enum';

@ApiTags('Task')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private service: AbstractTaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    type: TaskDto,
    status: HttpStatus.CREATED,
    description: 'The task has been successfully created',
  })
  async create(
    @Body() dto: TaskSwaggerDto,
    @AuthUser() authUser: IAuthUser,
  ): Promise<TaskDto> {
    const task = plainToInstance(TaskCreationDto, dto, {
      groups: [authUser.role],
    });
    task.createdBy = authUser.sub;
    task.updatedBy = authUser.sub;
    return this.service.create(task, authUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get task list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The tasks have been successfully fetched.',
    type: TaskPaginatorDto,
  })
  async list(
    @Query() paginator: PaginatorFilterDto,
    @AuthUser() authUser: IAuthUser,
  ): Promise<IPaginator<TaskDto>> {
    return this.service.list(paginator, authUser);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    type: TaskDto,
    status: HttpStatus.OK,
    description: 'The task has been successfully fetched',
  })
  async findOneByKey(
    @Param('id') id: string,
    @AuthUser() authUser: IAuthUser,
  ): Promise<TaskDto> {
    return this.service.findOneByKey('_id', id, authUser);
  }

  @Get('/user/:id/status/:status')
  @ApiOperation({ summary: 'Get tasks by user ID and Status' })
  @ApiResponse({
    type: TaskDto,
    status: HttpStatus.OK,
    description: 'The task has been successfully fetched',
  })
  async findByUserAndStatus(
    @Param('id') userId: string,
    @Param('status') status: TaskStatus,
    @AuthUser() authUser: IAuthUser,
  ): Promise<TaskDto[]> {
    return this.service.findByUserAndStatus(userId, status, authUser);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    type: TaskDto,
    status: HttpStatus.OK,
    description: 'The task has been successfully updated',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: TaskSwaggerDto,
    @AuthUser() authUser: IAuthUser,
  ): Promise<TaskDto> {
    const task = plainToInstance(TaskUpdationDto, dto, {
      groups: [authUser.role],
    });
    task.updatedBy = authUser.sub;
    return this.service.update(id, task, authUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
