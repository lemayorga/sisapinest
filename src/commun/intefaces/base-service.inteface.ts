import { ResponseDto } from "../dto";

export interface IBaseService <Record, Create , Update> {
    
    getAll(): Promise<Record[]>;
    getOne(id: number): Promise<Record>;
    insert(data: Create): Promise<ResponseDto>;
    modify(id: number, data: Update): Promise<ResponseDto>;
    remove(id: number): Promise<ResponseDto>;
}

/// https://github.com/xavism/nestjs-generic-crud/blob/master/src/modules/base/base.service.ts