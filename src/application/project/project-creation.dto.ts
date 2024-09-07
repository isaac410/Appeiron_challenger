import {
  IsDate,
  IsEnum,
  IsString,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { Role } from 'src/domain/user/role.enum';
import { ProjectStatus } from 'src/domain/project/project-status.enum';

export class ProjectCreationDto {
  @IsString()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  title: string;

  @IsString()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  description: string;

  @IsMongoId()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  owner: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  members: string[] = [];

  @IsOptional()
  @IsEnum(ProjectStatus)
  @Expose({ groups: [Role.ADMIN] })
  status: ProjectStatus = ProjectStatus.NOT_STARTED;

  @IsDate()
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
