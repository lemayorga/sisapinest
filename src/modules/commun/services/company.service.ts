import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IBaseService } from '../../../commun/intefaces';
import { ResponseDto } from '../../../commun/dto';
import { ErrorManager } from '../../../utils';
import { DelegateArgs, DelegateReturnTypes, PrismaRepo } from '../../../prisma/prima-repo';
import { CommunCompanyCreateDto, CommunCompanyDto, CommunCompanyUpdateDto } from '../dto';


type AccessDelegate = Prisma.CommunCompanyDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

@Injectable()
export class CompanyService extends  PrismaRepo<
    AccessDelegate,
    DelegateArgs<AccessDelegate>,
    DelegateReturnTypes<AccessDelegate>
    > 
    implements IBaseService<CommunCompanyDto, CommunCompanyCreateDto, CommunCompanyUpdateDto>{

    constructor() {
     super(new PrismaClient().communCompany);
    }

    async getAll(): Promise<CommunCompanyDto[]> {
       return await this.findMany();
    }

    async getOne(id: number): Promise<CommunCompanyDto> {
        return await this.findUnique({ where: { id }});
    }

    async insert(data: CommunCompanyCreateDto): Promise<ResponseDto> {
        const result: ResponseDto = await this.create({ data: data })
        .then(model =>  ({ok : true, data: model }))
        .catch(error => ErrorManager.handleDBErrors(error) );

        return result;
    }
    async modify(id: number, data: CommunCompanyUpdateDto): Promise<ResponseDto> {
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
