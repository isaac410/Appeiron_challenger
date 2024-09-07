import { User } from 'src/infrastructure/user/user.scheman';
import { UserCreationDto } from 'src/application/user/user-creation.dto';
import { IPaginator } from '../common/paginator.interface';
import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';

export default abstract class AbstractUserRepository {
  /**
   * @description Creates a new user based on the provided UserCreationDto.
   * @param dto The data transfer object used to create the document.
   * @returns A promise that resolves to the newly created document.
   * @example
   * return await this.model.create(dto);
   */
  abstract create(dto: UserCreationDto): Promise<User>;

  /**
   * @description Returns the list of users.
   * @param paginator pagination filter based on ‘PaginatorFilterDto’ with the parameters ‘order’, ‘page’ and ‘take’.
   * @returns A promise that resolves to the user paginated list documents.
   */
  abstract list(paginator: PaginatorFilterDto): Promise<IPaginator<User>>;

  /**
   * @description Get an user document filter by some property.
   * @param key name of the property to be filtered.
   * @param value value of the property to be filtered.
   * @returns A promise that resolves to the user requested.
   */
  abstract findOneByKey(key: string, value: unknown): Promise<User>;
}
