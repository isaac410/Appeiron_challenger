import {
  IsEnum,
  IsEmail,
  Matches,
  IsString,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { Role } from 'src/domain/user/role.enum';
import { UserStatus } from 'src/domain/user/user-status.enum';

export class UserCreationDto {
  @IsString()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  name: string;

  @IsString()
  @IsOptional()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  lastname: string;

  @IsEmail()
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  email: string;

  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'password should have atleast 1 uppercase, lowercase letter along with a number and special character',
  })
  @Expose({ groups: [Role.ADMIN, Role.USER] })
  password: string;

  @IsEnum(Role)
  @IsOptional()
  @Expose({
    groups: [Role.ADMIN],
  })
  role: Role = Role.USER;

  @IsOptional()
  @IsEnum(UserStatus)
  @Expose({ groups: [Role.ADMIN] })
  status: UserStatus = UserStatus.INACTIVE;

  @IsMongoId()
  @IsOptional()
  @Expose({ groups: [Role.ADMIN] })
  createdBy: string;

  @IsMongoId()
  @IsOptional()
  @Expose({ groups: [Role.ADMIN] })
  updatedBy: string;
}
