import { ApiProperty } from '@nestjs/swagger';

import { PaginatorDto } from '../common/paginator.dto';
import { TaskDto } from './task.dto';

export class TaskPaginatorDto extends PaginatorDto<TaskDto> {
  @ApiProperty({ isArray: true, type: () => TaskDto })
  documents: TaskDto[];
}
