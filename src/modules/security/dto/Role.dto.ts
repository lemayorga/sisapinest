import { ApiProperty } from "@nestjs/swagger";
import { Transform,  } from "class-transformer";
import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { boolean, string } from "joi";

export class RoleDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(80)
    @Transform(({value}) => value.toUpperCase().trim())
    @ApiProperty({
        description: 'Unique code to identify role',
        minimum: 1,
        maxLength: 80
    })
    codeRole: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'Name role',
        minimum: 1,
        maxLength: 80
    })
    name: string;

    @IsBoolean()
    @ApiProperty({
        description: 'Status role',
        type: boolean
    })
    isActive: boolean;
}  


export class CreateRoleDto {


    
}
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}


export class CreateUserToRolDto {
    
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    @ApiProperty()
    userId: string;
    
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.toUpperCase().trim())
    @ApiProperty()
    codeRole: string;    
}

export class CreateUserIdsToRolDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.toUpperCase().trim())
    @ApiProperty({
        description: 'Unique code to identify role',
    })
    codeRole: string;   

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1) q
    @ApiProperty({
        description: 'Arrays of Ids users',
        default: [], 
        isArray: true
    })
    userId: string[];
}

