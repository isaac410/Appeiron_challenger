import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

import { Role } from 'src/domain/user/role.enum';
import { UserStatus } from 'src/domain/user/user-status.enum';

export class UserDto {
  @ApiProperty({ type: String })
  @Transform((params) => params.obj._id)
  @Expose({ groups: [Role.ADMIN, Role.USER], name: '_id' })
  id: string;

  @ApiProperty({ type: String })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  name: string;

  @ApiProperty({ type: String })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  lastname: string;

  @ApiProperty({ type: String })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  email: string;

  @ApiProperty({ type: String })
  @Expose({ groups: [Role.ADMIN] })
  password: string;

  @ApiProperty({ enum: Role })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  role: Role = Role.USER;

  @ApiProperty({ enum: UserStatus })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  status: UserStatus;

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
