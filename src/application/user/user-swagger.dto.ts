import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/domain/user/role.enum';
import { UserStatus } from 'src/domain/user/user-status.enum';

export class UserSwaggerDto {
  @ApiPropertyOptional({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  lastname: string;

  @ApiPropertyOptional({
    type: String,
    description: 'must contain a valid email',
  })
  email: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'password should have atleast 1 uppercase, lowercase letter along with a number and special character',
  })
  password: string;

  @ApiPropertyOptional({ enum: Role })
  role: Role;

  @ApiPropertyOptional({ enum: UserStatus })
  status: UserStatus;
}
