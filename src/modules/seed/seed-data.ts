import { ValidRoles } from "../auth/interfaces";
import { RoleDto } from "../security/dto";

const roles:RoleDto[] = [
    { codeRole: ValidRoles.superUser, name: 'superusuario' , isActive: true},
    { codeRole: ValidRoles.admin, name: 'administrador' , isActive: true},
    { codeRole: ValidRoles.guest, name: 'invitado' , isActive: true},
];

export const initialDataSeed = {
    roles
};


