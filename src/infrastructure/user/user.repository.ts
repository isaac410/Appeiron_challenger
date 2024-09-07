import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './user.scheman';
import { IPaginator } from 'src/domain/common/paginator.interface';
import AbstractUserRepository from 'src/domain/user/abstract-user.repository';

import { UserCreationDto } from 'src/application/user/user-creation.dto';
import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';

@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(
    @InjectModel(User.name)
    private model: Model<UserDocument>,
  ) {}

  async create(dto: UserCreationDto): Promise<User> {
    try {
      dto = this.setObjectId<UserCreationDto>(dto);
      const document = (await this.model.create(dto)).toJSON();
      delete document.password;
      return document;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `this values currently exists[${Object.keys(error['keyValue'])
            .map((key) => `(${key}: ${error['keyValue'][key]})`)
            .join(', ')}]`,
        );
      throw new InternalServerErrorException('code: U-R-C');
    }
  }

  async list(paginator: PaginatorFilterDto): Promise<IPaginator<User>> {
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

  async findOneByKey(key: string, value): Promise<User> {
    const newKey: FilterQuery<Model<UserDocument>> = { [key]: value };
    return this.model.findOne(newKey).lean().exec();
  }

  private setObjectId<T>(dto): T {
    if (dto.createdBy)
      dto.createdBy = new Types.ObjectId(dto.createdBy) as unknown as string;
    if (dto.updatedBy)
      dto.updatedBy = new Types.ObjectId(dto.updatedBy) as unknown as string;
    return dto;
  }
}
