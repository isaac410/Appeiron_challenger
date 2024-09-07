import { IPaginator } from '../common/paginator.interface';

import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';

import { TaskCreationDto } from 'src/application/task/task-creation.dto';
import { TaskUpdationDto } from 'src/application/task/task-updation.dto';
import { Task } from 'src/infrastructure/task/task.schema';
import { TaskStatus } from './task-status.enum';

export default abstract class AbstractTaskRepository {
  /**
   * @description Creates a new task based on the provided TaskCreationDto.
   * @param dto The data transfer object used to create the document.
   * @returns A promise that resolves to the newly created task document.
   */
  abstract create(dto: TaskCreationDto): Promise<Task>;

  /**
   * @description Returns the list of tasks.
   * @param paginator pagination filter based on ‘PaginatorFilterDto’ with the parameters ‘order’, ‘page’ and ‘take’.
   * @returns A promise that resolves to the task paginated list documents.
   */
  abstract list(paginator: PaginatorFilterDto): Promise<IPaginator<Task>>;

  /**
   * @description Get a task document filter by some property.
   * @param key name of the property to be filtered.
   * @param value value of the property to be filtered.
   * @returns A promise that resolves to the task requested.
   */
  abstract findOneByKey(key: string, value: unknown): Promise<Task>;

  /**
   * @description Gets list of tasks where a certain user is involved .
   * @param userId User ID.
   * @param status value of the StatusProject to be filtered.
   * @returns A promise that resolves to the project requested.
   */
  abstract findByUserAndStatus(
    userId: string,
    status: TaskStatus,
  ): Promise<Task[]>;

  /**
   * @description Updates an existing task.
   * @param id The ID of the task to update.
   * @param dto The data transfer object containing updated task information.
   * @returns A promise that resolves to the updated task document.
   */
  abstract update(id: string, dto: TaskUpdationDto): Promise<Task>;

  /**
   * @description Deletes a task by its ID.
   * @param id The ID of the task to delete.
   * @returns A promise that resolves when the task is deleted.
   */
  abstract delete(id: string): Promise<void>;
}
