import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { TaskDto } from './task.dto';
import { TaskCreationDto } from './task-creation.dto';
import { TaskUpdationDto } from './task-updation.dto';
import { PaginatorFilterDto } from '../common/paginator-filter.dto';

import { IAuthUser } from '../auth/auth.service';
import AbstractTaskService from 'src/domain/task/abstract-task.service';

import { IPaginator } from 'src/domain/common/paginator.interface';
import AbstractTaskRepository from 'src/domain/task/abstract-task.repository';
import AbstractProjectService from 'src/domain/project/abstract-project.service';
import { TaskStatus } from 'src/domain/task/task-status.enum';

@Injectable()
export class TaskService extends AbstractTaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly repository: AbstractTaskRepository,
    private readonly projectService: AbstractProjectService,
  ) {
    super();
  }

  async create(dto: TaskCreationDto, authUser: IAuthUser): Promise<TaskDto> {
    try {
      await this.projectService.findOneByKey('_id', dto.project, authUser);
      dto.createdBy = authUser.sub;
      dto.updatedBy = authUser.sub;
      const task = await this.repository.create(dto);
      return plainToInstance(TaskDto, task, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
    } catch (error) {
      this.logger.error(`Error in ${TaskService.name} | method create`, error);
      throw error;
    }
  }

  async list(
    paginator: PaginatorFilterDto,
    authUser: IAuthUser,
  ): Promise<IPaginator<TaskDto>> {
    try {
      const tasksPaginated = await this.repository.list(paginator);
      const tasks = tasksPaginated.documents.map((task) => task);
      const tasksFiltered = plainToInstance(TaskDto, tasks, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
      return { ...tasksPaginated, documents: tasksFiltered };
    } catch (error) {
      this.logger.error(`Error in ${TaskService.name} | method list`, error);
      throw error;
    }
  }

  async findOneByKey(
    key: string,
    value: unknown,
    authUser: IAuthUser,
  ): Promise<TaskDto> {
    try {
      const task = await this.repository.findOneByKey(key, value);
      const taskFiltered = plainToInstance(TaskDto, task, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
      return taskFiltered;
    } catch (error) {
      this.logger.error(
        `Error in ${TaskService.name} | method findOneByKey | key: ${key}, value: ${value}`,
        error,
      );
      throw error;
    }
  }

  async findByUserAndStatus(
    userId: string,
    status: TaskStatus,
    authUser: IAuthUser,
  ): Promise<TaskDto[]> {
    try {
      const projects = await this.repository.findByUserAndStatus(
        userId,
        status,
      );
      return plainToInstance(TaskDto, projects, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
    } catch (error) {}
  }

  async update(
    id: string,
    dto: TaskUpdationDto,
    authUser: IAuthUser,
  ): Promise<TaskDto> {
    try {
      if (dto.project)
        await this.projectService.findOneByKey('_id', dto.project, authUser);
      const taskToUpdate = plainToInstance(TaskUpdationDto, dto, {
        groups: [authUser.role],
      });
      taskToUpdate.updatedBy = authUser.sub;
      const task = await this.repository.update(id, taskToUpdate);
      return plainToInstance(TaskDto, task, {
        exposeUnsetFields: false,
        groups: [authUser.role],
      });
    } catch (error) {
      this.logger.error(
        `Error in ${TaskService.name} | method update | id: ${id}`,
        error,
      );
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      this.logger.error(
        `Error in ${TaskService.name} | method delete | id: ${id}`,
        error,
      );
      throw error;
    }
  }
}
