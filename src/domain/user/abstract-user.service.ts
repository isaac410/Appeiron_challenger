import { UserDto } from 'src/application/user/user.dto';
import { UserCreationDto } from 'src/application/user/user-creation.dto';
import { PaginatorFilterDto } from 'src/application/common/paginator-filter.dto';
import { IPaginator } from '../common/paginator.interface';
import { IAuthUser } from 'src/application/auth/auth.service';

export default abstract class AbstractUserService {
  /**
   * @description Creates a new user based on the provided UserCreationDto.
   * @param dto The data transfer object used to create the document.
   * @returns A promise that resolves to the newly created dto document.
   * @example
   * return await user = await this.repository.create(dto);
   */
  abstract create(dto: UserCreationDto): Promise<UserDto>;

  /**
   * @description Returns the list of users.
   * @param paginator pagination filter based on ‘PaginatorFilterDto’ with the parameters ‘order’, ‘page’ and ‘take’..
   * @returns A promise that resolves to the user paginated list documents.
   */
  abstract list(
    paginator: PaginatorFilterDto,
    authUser: IAuthUser,
  ): Promise<IPaginator<UserDto>>;

  /**
   * @description Get an user document filter by some property.
   * @param key name of the property to be filtered.
   * @param value value of the property to be filtered.
   * @returns A promise that resolves to the user requested.
   */
  abstract findOneByKey(
    key: string,
    value: unknown,
    authUser: IAuthUser,
  ): Promise<UserDto>;
}
