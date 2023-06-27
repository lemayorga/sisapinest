import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { 
    IsBoolean, 
    IsDate, 
    IsEmail, 
    IsNotEmpty, 
    IsString,
     Matches, 
     MaxLength, 
     MinLength 
} from 'class-validator';

export class UserDto {
    username: string;
    email: string;
    isActive: boolean;
}  


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(60)
    @Transform(({value}) => value.toLowerCase().trim())
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(60)
    @Transform(({value}) => value.trim())
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
         message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @ApiProperty()
    userpass: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(60)
    @Transform(({value}) => value.trim())
    @ApiProperty()
    email: string;
}