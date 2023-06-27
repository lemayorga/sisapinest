import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IBaseService } from '../../../commun/intefaces';
import { ResponseDto } from '../../../commun/dto';
import { ErrorManager } from '../../../utils';
import { DelegateArgs, DelegateReturnTypes, PrismaRepo } from '../../../prisma/prima-repo';
import { CommunCatalogueCreateDto, CommunCatalogueDto, CommunCatalogueUpdateDto } from '../dto';


type AccessDelegate = Prisma.CommunCatalogueDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

@Injectable()
export class CatalogueService extends  PrismaRepo<
    AccessDelegate,
    DelegateArgs<AccessDelegate>,
    DelegateReturnTypes<AccessDelegate>
    > 
    implements IBaseService<CommunCatalogueDto, CommunCatalogueCreateDto, CommunCatalogueUpdateDto>{

    constructor() {
     super(new PrismaClient().communCatalogue);
    }

    async getAll(): Promise<CommunCatalogueDto[]> {
       return await this.findMany();
    }

    async getOne(id: number): Promise<CommunCatalogueDto> {
        return await this.findUnique({ where: { id }});
    }

    async insert(data: CommunCatalogueCreateDto): Promise<ResponseDto> {
        const result: ResponseDto = await this.create({ data: data })
        .then(model =>  ({ok : true, data: model }))
        .catch(error => ErrorManager.handleDBErrors(error) );

        return result;
    }
    async modify(id: number, data: CommunCatalogueUpdateDto): Promise<ResponseDto> {
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
