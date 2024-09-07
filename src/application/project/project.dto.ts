import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

import { ProjectStatus } from 'src/domain/project/project-status.enum';
import { Role } from 'src/domain/user/role.enum';

export class ProjectDto {
  @ApiProperty({ type: String })
  @Transform((params) => params.obj._id)
  @Expose({ groups: [Role.ADMIN, Role.USER], name: '_id' })
  id: string;

  @ApiProperty({ type: String })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  title: string;

  @ApiProperty({ type: String, required: false })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  description?: string;

  @ApiProperty({ type: String })
  @Transform((params) => params.obj.owner)
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  owner: string;

  @ApiProperty({ type: [String], required: false })
  @Transform((params) => params.obj.members)
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  members?: string[];

  @ApiProperty({ enum: ProjectStatus })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  status: ProjectStatus;

  @ApiProperty({ type: Date, required: false })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  dueDate?: Date;

  @ApiProperty({ type: Date })
  @Expose({ groups: [Role.ADMIN] })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @Expose({ groups: [Role.ADMIN] })
  updatedAt: Date;

  @ApiProperty({ type: String })
  @Transform((params) => params.obj.createdBy)
  @Expose({ groups: [Role.ADMIN] })
  createdBy: string;

  @ApiProperty({ type: String })
  @Transform((params) => params.obj.updatedBy)
  @Expose({ groups: [Role.ADMIN] })
  updatedBy: string;
}
