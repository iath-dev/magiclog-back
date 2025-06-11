import { SetMetadata } from '@nestjs/common';
import { UserRoleRole } from '../types/user.types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoleRole[]) => SetMetadata(ROLES_KEY, roles);
