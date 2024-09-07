import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { TaskStatus } from 'src/domain/task/task-status.enum';
import { Role } from 'src/domain/user/role.enum';

export class TaskDto {
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
  @Transform((params) => params.obj.project)
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  project: string;

  @ApiProperty({ enum: TaskStatus })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  status: TaskStatus;

  @ApiProperty({ type: Date, required: false })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  dueDate?: Date;

  @ApiProperty({ type: Date })
  @Expose({ groups: [Role.ADMIN] })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @Expose({ groups: [Role.ADMIN] })
  updatedAt: Date;

  @ApiProperty({ type: String, required: false })
  @Transform((params) => params.obj.createdBy)
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  createdBy?: string;

  @ApiProperty({ type: String, required: false })
  @Transform((params) => params.obj.updatedBy)
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  updatedBy?: string;
}
