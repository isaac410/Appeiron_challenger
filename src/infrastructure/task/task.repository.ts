import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

import { Task, TaskDocument } from './task.schema';
import { IPaginator } from 'src/domain/common/paginator.interface';
import AbstractTaskRepository from 'src/domain/task/abstract-task.repository';

import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';
import { TaskCreationDto } from 'src/application/task/task-creation.dto';
import { TaskUpdationDto } from 'src/application/task/task-updation.dto';
import { TaskStatus } from 'src/domain/task/task-status.enum';

@Injectable()
export class TaskRepository implements AbstractTaskRepository {
  constructor(
    @InjectModel(Task.name)
    private model: Model<TaskDocument>,
  ) {}

  async create(dto: TaskCreationDto): Promise<Task> {
    try {
      dto = this.setObjectId<TaskCreationDto>(dto);
      return (await this.model.create(dto)).toJSON();
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `This values currently exists [${Object.keys(error['keyValue'])
            .map((key) => `(${key}: ${error['keyValue'][key]})`)
            .join(', ')}]`,
        );
      throw new InternalServerErrorException('code: T-R-C');
    }
  }

  async list(paginator: PaginatorFilterDto): Promise<IPaginator<Task>> {
    const match: Record<string, PropertyDecorator> = {};

    const totalCountPipeline = [
      { $match: match },
      { $group: { _id: null, totalCount: { $sum: 1 } } },
    ];

    const totalCountResult = await this.model
      .aggregate(totalCountPipeline)
      .exec();

    const totalCount =
      totalCountResult.length > 0 ? totalCountResult[0].totalCount : 0;

    const totalPages = Math.ceil(totalCount / paginator.take);

    const documents = await this.model
      .aggregate([])
      .match(match)
      .sort({ name: paginator.order })
      .skip(paginator.skip)
      .limit(paginator.take)
      .exec();

    return {
      total: documents.length,
      pages: totalPages,
      documents,
      totalCount,
    };
  }

  async findOneByKey(key: string, value): Promise<Task> {
    const newKey: FilterQuery<Model<TaskDocument>> = { [key]: value };
    return this.model.findOne(newKey).lean().exec();
  }

  async findByUserAndStatus(
    userId: string,
    status: TaskStatus,
  ): Promise<Task[]> {
    try {
      const objectId = new Types.ObjectId(userId);
      const filter: FilterQuery<TaskDocument> = {
        $or: [{ owner: objectId }, { members: objectId }],
        status,
      };
      return this.model.find(filter).lean().exec();
    } catch (error) {
      throw new InternalServerErrorException('code: T-R-FBUS');
    }
  }

  async update(id: string, dto: TaskUpdationDto): Promise<Task> {
    try {
      dto = this.setObjectId<TaskUpdationDto>(dto);
      return this.model
        .findByIdAndUpdate(id, dto, {
          new: true,
          runValidators: true,
        })
        .lean()
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('code: T-R-U');
    }
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  private setObjectId<T>(dto): T {
    if (dto.createdBy)
      dto.createdBy = new Types.ObjectId(dto.createdBy) as unknown as string;
    if (dto.updatedBy)
      dto.updatedBy = new Types.ObjectId(dto.updatedBy) as unknown as string;
    if (dto.project)
      dto.project = new Types.ObjectId(dto.project) as unknown as string;
    if (dto.owner)
      dto.owner = new Types.ObjectId(dto.owner) as unknown as string;
    if (dto.members)
      dto.members = dto.members.map(
        (menber) => new Types.ObjectId(menber) as unknown as string,
      );
    return dto;
  }
}
