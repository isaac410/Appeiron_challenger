import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskController } from './task.controller';

import { Task, TaskSchema } from './task.schema';
import { TaskRepository } from './task.repository';
import AbstractTaskRepository from 'src/domain/task/abstract-task.repository';

import { TaskService } from 'src/application/task/task.service';
import AbstractTaskService from 'src/domain/task/abstract-task.service';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ProjectModule,
  ],
  controllers: [TaskController],
  providers: [
    { useClass: TaskService, provide: AbstractTaskService },
    { useClass: TaskRepository, provide: AbstractTaskRepository },
  ],
  exports: [
    { useClass: TaskService, provide: AbstractTaskService },
    { useClass: TaskRepository, provide: AbstractTaskRepository },
  ],
})
export class TaskModule {}
