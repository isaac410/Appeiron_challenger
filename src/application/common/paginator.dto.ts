import { ApiProperty } from '@nestjs/swagger';
import { IPaginator } from 'src/domain/common/paginator.interface';

export class PaginatorDto<T> implements IPaginator<T> {
  @ApiProperty()
  pages: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ isArray: true, type: () => Object })
  documents: T[];

  @ApiProperty()
  totalCount: number;
}
