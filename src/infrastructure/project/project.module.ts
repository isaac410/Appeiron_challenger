import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Project, ProjectSchema } from './project.scheman';
import { ProjectController } from './project.controller';

import { ProjectRepository } from './project.repository';
import AbstractProjectRepository from 'src/domain/project/abstract-project.repository';

import { ProjectService } from 'src/application/project/project.service';
import AbstractProjectService from 'src/domain/project/abstract-project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [
    { useClass: ProjectService, provide: AbstractProjectService },
    { useClass: ProjectRepository, provide: AbstractProjectRepository },
  ],
  exports: [
    { useClass: ProjectService, provide: AbstractProjectService },
    { useClass: ProjectRepository, provide: AbstractProjectRepository },
  ],
})
export class ProjectModule {}
