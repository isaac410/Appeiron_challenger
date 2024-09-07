import { IPaginator } from 'src/domain/common/paginator.interface';

import { TaskStatus } from './task-status.enum';
import { IAuthUser } from 'src/application/auth/auth.service';

import { TaskDto } from 'src/application/task/task.dto';
import { TaskCreationDto } from 'src/application/task/task-creation.dto';
import { TaskUpdationDto } from 'src/application/task/task-updation.dto';
import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';

export default abstract class AbstractTaskService {
  /**
   * @description Creates a new task based on the provided TaskCreationDto.
   * @param dto The data transfer object used to create the task.
   * @returns A promise that resolves to the newly created task dto document.
   * @example
   * return await task = await this.repository.create(dto);
   */
  abstract create(dto: TaskCreationDto, authUser: IAuthUser): Promise<TaskDto>;

  /**
   * @description Returns the list of tasks.
   * @param paginator Pagination filter based on ‘PaginatorFilterDto’ with the parameters ‘order’, ‘page’ and ‘take’.
   * @param authUser The authenticated user performing the request.
   * @returns A promise that resolves to the task paginated list documents.
   */
  abstract list(
    paginator: PaginatorFilterDto,
    authUser: IAuthUser,
  ): Promise<IPaginator<TaskDto>>;

  /**
   * @description Get a task document filtered by a specific property.
   * @param key The name of the property to filter by.
   * @param value The value of the property to filter by.
   * @param authUser The authenticated user performing the request.
   * @returns A promise that resolves to the task requested.
   */
  abstract findOneByKey(
    key: string,
    value: unknown,
    authUser: IAuthUser,
  ): Promise<TaskDto>;

  /**
   * @description Gets list of projects where a certain user is involved .
   * @param userId User ID.
   * @param status value of the StatusTask to be filtered.
   * @returns A promise that resolves to the project requested.
   */
  abstract findByUserAndStatus(
    userId: string,
    status: TaskStatus,
    authUser: IAuthUser,
  ): Promise<TaskDto[]>;

  /**
   * @description Updates an existing task based on the provided TaskUpdationDto.
   * @param id The ID of the task to update.
   * @param dto The data transfer object containing updated task information.
   * @param authUser The authenticated user performing the update.
   * @returns A promise that resolves to the updated task dto document.
   */
  abstract update(
    id: string,
    dto: TaskUpdationDto,
    authUser: IAuthUser,
  ): Promise<TaskDto>;

  /**
   * @description Deletes a task by its ID.
   * @param id The ID of the task to delete.
   * @returns A promise that resolves when the task is deleted.
   */
  abstract delete(id: string): Promise<void>;
}
