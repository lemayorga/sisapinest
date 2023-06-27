import { Prisma, PrismaClient } from "@prisma/client";
import { Operations } from "./delegate.intereface";
import { PrismaService } from "./prisma.service";

export class PrismaRepo<
  Db extends { [K in Operations]: (args: unknown) => unknown },
  Args  extends { [K in Operations]: unknown },
  Return extends { [K in Operations]: unknown },
> {
  protected db:  PrismaService

  constructor(protected model: Db) {}

  async findUnique(args: Args['findUnique']): Promise<Return['findUnique']> {
    return this.model.findUnique(args);
  }

  async findFirst(args?: Args['findFirst']): Promise<Return['findFirst']> {
    return this.model.findFirst(args);
  }

  async findMany(args?: Args['findMany']): Promise<Return['findMany']> {
    return await this.model.findMany(args);
  }

  async create(args: Args['create']): Promise<Return['create']> {
    return this.model.create(args);
  }

  async createMany(args: Args['createMany']): Promise<Return['createMany']> {
    return this.model.createMany(args);
  }

  async update(args: Args['update']): Promise<Return['update']> {
    return this.model.update(args);
  }

  async delete(args: Args['delete']): Promise<Return['delete']> {
    return this.model.delete(args);
  }

  async upsert(args: Args['upsert']): Promise<Return['upsert']> {
    return this.model.upsert(args);
  }

  async count(args?: Args['count']): Promise<Return['count']> {
    return this.model.count(args);
  }

  async aggregate(args: Args['aggregate']): Promise<Return['aggregate']> {
    return this.model.aggregate(args);
  }

  async deleteMany(args: Args['deleteMany']): Promise<Return['deleteMany']> {
    return this.model.deleteMany(args);
  }

  async updateMany(args: Args['updateMany']): Promise<Return['updateMany']> {
    return this.model.updateMany(args);
  }
}


export type DelegateArgs<T> = {
    [K in keyof T]: T[K] extends (args: infer A) => Promise<unknown> ? A : never;
  };
  
  export type DelegateReturnTypes<T> = {
    [K in keyof T]: T[K] extends (args: infer A) => Promise<infer R> ? R : never;
  };

  // https://github.com/prisma/prisma/issues/5273