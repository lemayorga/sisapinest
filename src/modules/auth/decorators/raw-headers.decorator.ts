import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const RawHeaders = createParamDecorator(
    (data, ctx: ExecutionContext) => {

   // console.log({data});

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    //console.log(user);

    if(!user)
      throw new InternalServerErrorException('User not found (request).');

    return (!data) ? user : user[data];
});