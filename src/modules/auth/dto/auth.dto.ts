
import { ApiProperty } from "@nestjs/swagger";
import { 
    IsNotEmpty, 
    IsString,
    Matches, 
    MaxLength, 
    MinLength 
} from 'class-validator';

export class LoginUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(60)
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(60)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
         message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @ApiProperty()
    password: string;
}


export interface UserDataRequest {
    userId: string;
    username: string;
    email: string;
    codeRole: string;
}