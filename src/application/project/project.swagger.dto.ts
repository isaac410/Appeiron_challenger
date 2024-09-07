import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectStatus } from 'src/domain/project/project-status.enum';

export class ProjectSwaggerDto {
  @ApiPropertyOptional({ type: String })
  title: string;

  @ApiPropertyOptional({ type: String })
  description: string;

  @ApiPropertyOptional({ type: String, description: 'Owner ID of the project' })
  owner: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Array of member IDs for the project',
  })
  members: string[];

  @ApiPropertyOptional({
    enum: ProjectStatus,
    description: 'Current status of the project',
  })
  status: ProjectStatus;

  @ApiPropertyOptional({
    type: String,
    description: 'Due date for the project',
    example: '2024-09-06',
  })
  dueDate: string;
}
