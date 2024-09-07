import {
  IsDate,
  IsEnum,
  IsString,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { TaskStatus } from 'src/domain/task/task-status.enum';
import { Role } from 'src/domain/user/role.enum';

export class TaskUpdationDto {
  @IsString()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  title: string;

  @IsString()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  description: string;

  @IsMongoId()
  @IsOptional()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  owner: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  members: string[] = [];

  @IsMongoId()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  project: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  @Expose({ groups: [Role.ADMIN] })
  status: TaskStatus = TaskStatus.NOT_STARTED;

  @IsDate()
  @IsOptional()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  dueDate: Date;

  @IsMongoId()
  @IsOptional()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  createdBy: string;

  @IsMongoId()
  @IsOptional()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  updatedBy: string;
}
