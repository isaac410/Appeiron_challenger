import { IPaginator } from 'src/domain/common/paginator.interface';

import { ProjectCreationDto } from 'src/application/project/project-creation.dto';
import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';
import { IAuthUser } from 'src/application/auth/auth.service';
import { ProjectUpdationDto } from 'src/application/project/project-updation.dto';
import { ProjectDto } from 'src/application/project/project.dto';
import { ProjectStatus } from './project-status.enum';

export default abstract class AbstractProjectService {
  /**
   * @description Creates a new project based on the provided ProjectCreationDto.
   * @param dto The data transfer object used to create the project.
   * @returns A promise that resolves to the newly created project dto document.
   * @example
   * return await project = await this.repository.create(dto);
   */
  abstract create(
    dto: ProjectCreationDto,
    authUser: IAuthUser,
  ): Promise<ProjectDto>;

  /**
   * @description Returns the list of projects.
   * @param paginator Pagination filter based on ‘PaginatorFilterDto’ with the parameters ‘order’, ‘page’ and ‘take’.
   * @param authUser The authenticated user performing the request.
   * @returns A promise that resolves to the project paginated list documents.
   */
  abstract list(
    paginator: PaginatorFilterDto,
    authUser: IAuthUser,
  ): Promise<IPaginator<ProjectDto>>;

  /**
   * @description Get a project document filtered by a specific property.
   * @param key The name of the property to filter by.
   * @param value The value of the property to filter by.
   * @param authUser The authenticated user performing the request.
   * @returns A promise that resolves to the project requested.
   */
  abstract findOneByKey(
    key: string,
    value: unknown,
    authUser: IAuthUser,
  ): Promise<ProjectDto>;

  /**
   * @description Gets list of projects where a certain user is involved .
   * @param userId User ID.
   * @param status value of the StatusProject to be filtered.
   * @returns A promise that resolves to the project requested.
   */
  abstract findByUserAndStatus(
    userId: string,
    status: ProjectStatus,
    authUser: IAuthUser,
  ): Promise<ProjectDto[]>;

  /**
   * @description Updates an existing project based on the provided ProjectUpdationDto.
   * @param id The ID of the project to update.
   * @param dto The data transfer object containing updated project information.
   * @param authUser The authenticated user performing the update.
   * @returns A promise that resolves to the updated project dto document.
   */
  abstract update(
    id: string,
    dto: ProjectUpdationDto,
    authUser: IAuthUser,
  ): Promise<ProjectDto>;

  /**
   * @description Deletes a project by its ID.
   * @param id The ID of the project to delete.
   * @returns A promise that resolves when the project is deleted.
   */
  abstract delete(id: string): Promise<void>;
}
