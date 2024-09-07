import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ProjectDto } from './project.dto';
import { ProjectCreationDto } from './project-creation.dto';
import { ProjectUpdationDto } from './project-updation.dto';
import { PaginatorFilterDto } from '../common/paginator-filter.dto';

import { IAuthUser } from '../auth/auth.service';
import AbstractProjectService from 'src/domain/project/abstract-project.service';

import { IPaginator } from 'src/domain/common/paginator.interface';
import AbstractProjectRepository from 'src/domain/project/abstract-project.repository';
import { ProjectStatus } from 'src/domain/project/project-status.enum';

@Injectable()
export class ProjectService extends AbstractProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(private readonly repository: AbstractProjectRepository) {
    super();
  }

  async create(
    dto: ProjectCreationDto,
    authUser: IAuthUser,
  ): Promise<ProjectDto> {
    try {
      dto.createdBy = authUser.sub;
      dto.updatedBy = authUser.sub;
      const project = await this.repository.create(dto);
      return plainToInstance(ProjectDto, project, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
    } catch (error) {
      this.logger.error(
        `Error in ${ProjectService.name} | method create`,
        error,
      );
      throw error;
    }
  }

  async list(
    paginator: PaginatorFilterDto,
    authUser: IAuthUser,
  ): Promise<IPaginator<ProjectDto>> {
    try {
      const projectsPaginated = await this.repository.list(paginator);
      const projects = projectsPaginated.documents.map((project) => project);
      const projectsFiltered = plainToInstance(ProjectDto, projects, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
      return { ...projectsPaginated, documents: projectsFiltered };
    } catch (error) {
      this.logger.error(`Error in ${ProjectService.name} | method list`, error);
      throw error;
    }
  }

  async findOneByKey(
    key: string,
    value: unknown,
    authUser: IAuthUser,
  ): Promise<ProjectDto> {
    try {
      const project = await this.repository.findOneByKey(key, value);
      if (!project)
        throw new NotFoundException(
          `project with property ${key}: and value ${value}, not found`,
        );

      return plainToInstance(ProjectDto, project, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
    } catch (error) {
      this.logger.error(
        `Error in ${ProjectService.name} | method findOneByKey | key: ${key}, value: ${value}`,
        error,
      );
      throw error;
    }
  }

  async findByUserAndStatus(
    userId: string,
    status: ProjectStatus,
    authUser: IAuthUser,
  ): Promise<ProjectDto[]> {
    try {
      const projects = await this.repository.findByUserAndStatus(
        userId,
        status,
      );
      return plainToInstance(ProjectDto, projects, {
        groups: [authUser.role],
        excludePrefixes: ['__'],
      });
    } catch (error) {}
  }

  async update(
    id: string,
    dto: ProjectUpdationDto,
    authUser: IAuthUser,
  ): Promise<ProjectDto> {
    try {
      dto.updatedBy = authUser.sub;
      const projectToUpdate = plainToInstance(ProjectUpdationDto, dto, {
        groups: [authUser.role],
      });
      const project = await this.repository.update(id, projectToUpdate);
      return plainToInstance(ProjectDto, project, {
        exposeUnsetFields: false,
        groups: [authUser.role],
      });
    } catch (error) {
      this.logger.error(
        `Error in ${ProjectService.name} | method update | id: ${id}`,
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
        `Error in ${ProjectService.name} | method delete | id: ${id}`,
        error,
      );
      throw error;
    }
  }
}
