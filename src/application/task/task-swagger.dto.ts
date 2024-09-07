import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from 'src/domain/task/task-status.enum';

export class TaskSwaggerDto {
  @ApiPropertyOptional({ type: String })
  title: string;

  @ApiPropertyOptional({ type: String })
  description: string;

  @ApiPropertyOptional({ type: String, description: 'Owner ID of the task' })
  owner: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Array of member IDs for the task',
  })
  members: string[];

  @ApiPropertyOptional({
    type: String,
    description: 'Project ID associated with the task',
  })
  project: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Current status of the task',
  })
  status: TaskStatus;

  @ApiPropertyOptional({
    type: String,
    description: 'Due date for the task',
    example: '2024-09-06',
  })
  dueDate: string;
}
