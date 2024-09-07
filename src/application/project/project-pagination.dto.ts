import { ApiProperty } from '@nestjs/swagger';

import { PaginatorDto } from '../common/paginator.dto';
import { ProjectDto } from './project.dto';

export class ProjectPaginatorDto extends PaginatorDto<ProjectDto> {
  @ApiProperty({ isArray: true, type: () => ProjectDto })
  documents: ProjectDto[];
}
