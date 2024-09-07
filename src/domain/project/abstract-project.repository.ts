import { IPaginator } from '../common/paginator.interface';
import { Project } from 'src/infrastructure/project/project.scheman';
import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';
import { ProjectCreationDto } from 'src/application/project/project-creation.dto';
import { ProjectUpdationDto } from 'src/application/project/project-updation.dto';
import { ProjectStatus } from './project-status.enum';

export default abstract class AbstractProjectRepository {
  /**
   * @description Creates a new project based on the provided ProjectCreationDto.
   * @param dto The data transfer object used to create the document.
   * @returns A promise that resolves to the newly created project document.
   */
  abstract create(dto: ProjectCreationDto): Promise<Project>;

  /**
   * @description Returns the list of projects.
   * @param paginator pagination filter based on ‘PaginatorFilterDto’ with the parameters ‘order’, ‘page’ and ‘take’.
   * @returns A promise that resolves to the project paginated list documents.
   */
  abstract list(paginator: PaginatorFilterDto): Promise<IPaginator<Project>>;

  /**
   * @description Get a project document filter by some property.
   * @param key name of the property to be filtered.
   * @param value value of the property to be filtered.
   * @returns A promise that resolves to the project requested.
   */
  abstract findOneByKey(key: string, value: unknown): Promise<Project>;

  /**
   * @description Gets list of projects where a certain user is involved .
   * @param userId User ID.
   * @param status value of the StatusProject to be filtered.
   * @returns A promise that resolves to the project requested.
   */
  abstract findByUserAndStatus(
    userId: string,
    status: ProjectStatus,
  ): Promise<Project[]>;

  /**
   * @description Updates an existing project.
   * @param id The ID of the project to update.
   * @param dto The data transfer object containing updated project information.
   * @returns A promise that resolves to the updated project document.
   */
  abstract update(id: string, dto: ProjectUpdationDto): Promise<Project>;

  /**
   * @description Deletes a project by its ID.
   * @param id The ID of the project to delete.
   * @returns A promise that resolves when the project is deleted.
   */
  abstract delete(id: string): Promise<void>;
}
