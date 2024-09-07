import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from './user.dto';
import { PaginatorDto } from '../common/paginator.dto';

export class UserPaginatorDto extends PaginatorDto<UserDto> {
  @ApiProperty({ isArray: true, type: () => UserDto })
  documents: UserDto[];
}
