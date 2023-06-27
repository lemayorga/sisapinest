import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IBaseService } from '../../../commun/intefaces';
import { ResponseDto } from '../../../commun/dto';
import { ErrorManager } from '../../../utils';
import { DelegateArgs, DelegateReturnTypes, PrismaRepo } from '../../../prisma/prima-repo';
import { CommunPersonCreateDto, CommunPersonDto, CommunPersonUpdateDto } from '../dto';


type AccessDelegate = Prisma.CommunPersonDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

@Injectable()
export class PersonService extends  PrismaRepo<
    AccessDelegate,
    DelegateArgs<AccessDelegate>,
    DelegateReturnTypes<AccessDelegate>
    > 
    implements IBaseService<CommunPersonDto, CommunPersonCreateDto, CommunPersonUpdateDto>{

    constructor() {
     super(new PrismaClient().communPerson);
    }

    async getAll(): Promise<CommunPersonDto[]> {
       return await this.findMany();
    }

    async getOne(id: number): Promise<CommunPersonDto> {
        return await this.findUnique({ where: { id }});
    }

    async insert(data: CommunPersonCreateDto): Promise<ResponseDto> {
        const result: ResponseDto = await this.create({ data: data })
        .then(model =>  ({ok : true, data: model }))
        .catch(error => ErrorManager.handleDBErrors(error) );

        return result;
    }
    async modify(id: number, data: CommunPersonUpdateDto): Promise<ResponseDto> {
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
