import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IBaseService } from '../../../commun/intefaces';
import { ResponseDto } from '../../../commun/dto';
import { DelegateArgs, DelegateReturnTypes, PrismaRepo } from '../../../prisma/prima-repo';
import { SecurityAccessCreateDto, SecurityAccessDto, SecurityAccessUpdateDto } from '../dto';
import { ErrorManager } from '../../../utils';


type AccessDelegate = Prisma.SecurityAccessDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

@Injectable()
export class AccessService extends  PrismaRepo<
        AccessDelegate,
        DelegateArgs<AccessDelegate>,
        DelegateReturnTypes<AccessDelegate>
    > 
    implements IBaseService<SecurityAccessDto, SecurityAccessCreateDto, SecurityAccessUpdateDto>{

    constructor() {
        super(new PrismaClient().securityAccess);
    }
    
    async getAll(): Promise<SecurityAccessDto[]> {
      return await this.findMany();
    }

    async getOne(id: number): Promise<SecurityAccessDto> {
        return await this.findUnique({ where: { id }});
    }

    async insert(data: SecurityAccessCreateDto): Promise<ResponseDto> {
        const result: ResponseDto = await this.create({ data: data })
        .then(model =>  ({ok : true, data: model }))
        .catch(error => ErrorManager.handleDBErrors(error) );

        return result;
    }
    async modify(id: number, data: SecurityAccessUpdateDto): Promise<ResponseDto> {
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
