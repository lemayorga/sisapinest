import { UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvCofigName } from "../../../config/env.config";
import { UserService } from "../../security/services";
import { JwtPayload } from "../interfaces/jwt-payload-interface";
import { UserDataRequest } from "../dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ){
        super({
            secretOrKey: configService.get(EnvCofigName.jwtSecret),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JwtPayload): Promise<UserDataRequest> {
    
        const { email, username , roleCode } = payload;
        const user = await this.userService.findByUserName(username);


        if(!user)
         throw new UnauthorizedException('Token not valid.');

        if(!user.isActive)
         throw new UnauthorizedException('User is inactive, talk with an admin.');

        const userRquest:UserDataRequest = {
            codeRole: roleCode,
            userId: user.id,
            username: username,
            email: email,
        }
        return userRquest;
    }
}