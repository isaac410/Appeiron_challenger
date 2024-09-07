import {
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  Delete,
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

import { ProjectDto } from 'src/application/project/project.dto';
import { ProjectCreationDto } from 'src/application/project/project-creation.dto';
import { ProjectUpdationDto } from 'src/application/project/project-updation.dto';

import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';

import { IAuthUser } from 'src/application/auth/auth.service';
import AbstractProjectService from 'src/domain/project/abstract-project.service';

import { AuthUser } from 'src/application/user/auth-user.decorator';

import { IPaginator } from 'src/domain/common/paginator.interface';
import { ProjectSwaggerDto } from 'src/application/project/project.swagger.dto';
import { ProjectPaginatorDto } from 'src/application/project/project-pagination.dto';
import { ProjectStatus } from 'src/domain/project/project-status.enum';

@ApiTags('Project')
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private service: AbstractProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    type: ProjectDto,
    status: HttpStatus.CREATED,
    description: 'The project has been successfully created',
  })
  async create(
    @Body() dto: ProjectSwaggerDto,
    @AuthUser() authUser: IAuthUser,
  ): Promise<ProjectDto> {
    const project = plainToInstance(ProjectCreationDto, dto, {
      groups: [authUser.role],
    });
    return this.service.create(project, authUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get project list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The projects have been successfully fetched.',
    type: ProjectPaginatorDto,
  })
  async list(
    @Query() paginator: PaginatorFilterDto,
    @AuthUser() authUser: IAuthUser,
  ): Promise<IPaginator<ProjectDto>> {
    return this.service.list(paginator, authUser);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({
    type: ProjectDto,
    status: HttpStatus.OK,
    description: 'The project has been successfully fetched',
  })
  async findOneByKey(
    @Param('id') id: string,
    @AuthUser() authUser: IAuthUser,
  ): Promise<ProjectDto> {
    return this.service.findOneByKey('_id', id, authUser);
  }

  @Get('/user/:id/status/:status')
  @ApiOperation({ summary: 'Get projects by user ID and Status' })
  @ApiResponse({
    type: ProjectDto,
    status: HttpStatus.OK,
    description: 'The project has been successfully fetched',
  })
  async findByUserAndStatus(
    @Param('id') userId: string,
    @Param('status') status: ProjectStatus,
    @AuthUser() authUser: IAuthUser,
  ): Promise<ProjectDto[]> {
    return this.service.findByUserAndStatus(userId, status, authUser);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({
    type: ProjectDto,
    status: HttpStatus.OK,
    description: 'The project has been successfully updated',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: ProjectSwaggerDto,
    @AuthUser() authUser: IAuthUser,
  ): Promise<ProjectDto> {
    const project = plainToInstance(ProjectUpdationDto, dto, {
      groups: [authUser.role],
    });
    return this.service.update(id, project, authUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The project has been successfully deleted',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
