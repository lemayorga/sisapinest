import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SecurityUser } from '@prisma/client';
import { AuthService } from './auth.service';
import { Auth, GetUser , RawHeaders } from './decorators';
import { LoginUserDto, UserDataRequest } from './dto';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }


  @Get('checkStatus')
  async checkAuthStatus(@GetUser() userReq: UserDataRequest){
    return this.authService.checkAuthStatus(userReq);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(@Req() request: Express.Request){

    console.log(request);

    return {
      ok: true,
      message: 'Hola privado'
    };
  }

  @Get('private2')
  @UseGuards(AuthGuard())
  testingPrivateRoute2(
  //  @GetUser(['emai','id','username']) user: SecurityUser){
    @GetUser() user: SecurityUser,
    @GetUser('email') emailUser: string,
    @RawHeaders() rawHeaders: string[]){
    
     // console.log(user);
    
    return {
      ok: true,
      user,
      emailUser,
      rawHeaders
    };
  }
 // @Auth()
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  @Get('private3')
  private3(@GetUser() user: SecurityUser,){

    console.log(user);

    return {
      ok: true,
      message: user
    };
  }
}
