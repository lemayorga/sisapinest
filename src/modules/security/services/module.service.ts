import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IBaseService } from '../../../commun/intefaces';
import { ResponseDto } from '../../../commun/dto';
import { ErrorManager } from '../../../utils';
import { DelegateArgs, DelegateReturnTypes, PrismaRepo } from '../../../prisma/prima-repo';
import { SecurityModuleCreateDto, SecurityModuleDto, SecurityModuleUpdateDto } from '../dto';


type AccessDelegate = Prisma.SecurityModuleDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

@Injectable()
export class ModuleService extends  PrismaRepo<
    AccessDelegate,
    DelegateArgs<AccessDelegate>,
    DelegateReturnTypes<AccessDelegate>
    > 
    implements IBaseService<SecurityModuleDto, SecurityModuleCreateDto, SecurityModuleUpdateDto>{

    constructor() {
    super(new PrismaClient().securityModule);
    }

    async getAll(): Promise<SecurityModuleDto[]> {
       return await this.findMany();
    }

    async getOne(id: number): Promise<SecurityModuleDto> {
        return await this.findUnique({ where: { id }});
    }

    async insert(data: SecurityModuleCreateDto): Promise<ResponseDto> {
        const result: ResponseDto = await this.create({ data: data })
        .then(model =>  ({ok : true, data: model }))
        .catch(error => ErrorManager.handleDBErrors(error) );

        return result;
    }
    async modify(id: number, data: SecurityModuleUpdateDto): Promise<ResponseDto> {
        const result: ResponseDto = await this.update({ where: { id }, data: data })
        .then(model =>  ({ok : true, data: model }))
        .catch(error => ErrorManager.handleDBErrors(error) );

        return result;
    }

    async remove(id: number): Promise<ResponseDto> {
        const result: ResponseDto = await this.delete({ where: { id } })
        .then(model =>  ({ok : true, data: model }))
        .catch(error => ErrorManager.handleDBErrors(error) );

        return result;
    }
}
