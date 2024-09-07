import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.scheman';
import { IPaginator } from 'src/domain/common/paginator.interface';
import AbstractProjectRepository from 'src/domain/project/abstract-project.repository';

import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';
import { ProjectCreationDto } from 'src/application/project/project-creation.dto';
import { ProjectUpdationDto } from 'src/application/project/project-updation.dto';
import { ProjectStatus } from 'src/domain/project/project-status.enum';

@Injectable()
export class ProjectRepository implements AbstractProjectRepository {
  constructor(
    @InjectModel(Project.name)
    private model: Model<ProjectDocument>,
  ) {}

  async create(dto: ProjectCreationDto): Promise<Project> {
    try {
      dto = this.setObjectId<ProjectCreationDto>(dto);
      const document = (await this.model.create(dto)).toObject();
      return document;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `This values currently exists [${Object.keys(error['keyValue'])
            .map((key) => `(${key}: ${error['keyValue'][key]})`)
            .join(', ')}]`,
        );
      throw new InternalServerErrorException('code: P-R-C');
    }
  }

  async list(paginator: PaginatorFilterDto): Promise<IPaginator<Project>> {
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

  async findOneByKey(key: string, value): Promise<Project> {
    const newKey: FilterQuery<Model<ProjectDocument>> = { [key]: value };
    return this.model.findOne(newKey).lean().exec();
  }

  async findByUserAndStatus(
    userId: string,
    status: ProjectStatus,
  ): Promise<Project[]> {
    try {
      const objectId = new Types.ObjectId(userId);
      const filter: FilterQuery<ProjectDocument> = {
        $or: [{ owner: objectId }, { members: objectId }],
        status,
      };
      return this.model.find(filter).lean().exec();
    } catch (error) {
      throw new InternalServerErrorException('code: P-R-FBUS');
    }
  }

  async update(id: string, dto: ProjectUpdationDto): Promise<Project> {
    try {
      dto = this.setObjectId<ProjectUpdationDto>(dto);
      return this.model
        .findByIdAndUpdate(id, dto, {
          new: true,
          runValidators: true,
        })
        .lean()
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('code: P-R-U');
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
    if (dto.owner)
      dto.owner = new Types.ObjectId(dto.owner) as unknown as string;
    if (dto.members)
      dto.members = dto.members.map(
        (menber) => new Types.ObjectId(menber) as unknown as string,
      );
    return dto;
  }
}
