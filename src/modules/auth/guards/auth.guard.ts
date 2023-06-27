
import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtected } from '../decorators';
import { ValidRoles } from '../interfaces';
import { AuthGuard } from '@nestjs/passport';
import { UerRoleGuard } from './uer-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(ValidRoles.superUser, ValidRoles.admin),
    UseGuards(AuthGuard(), UerRoleGuard)
  );
}