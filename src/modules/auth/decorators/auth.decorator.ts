import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { ValidRoles } from '../interfaces';
import { AuthGuard } from '@nestjs/passport';
import { UerRoleGuard } from '../guards/uer-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UerRoleGuard),
  );
}