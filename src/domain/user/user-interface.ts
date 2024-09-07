import { UserStatus } from './user-status.enum';
import { Role } from 'src/domain/user/role.enum';

export interface IUser {
  id: string;
  name: string;
  lastname?: string;
  email: string;
  password: string;
  roles: Role;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
