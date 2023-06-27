import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CommunPersonDto {
    @IsNumber()
    @ApiProperty({  description: 'Id database'  })
    id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'First Name',
        minimum: 1,
        maxLength: 80,
        required: true
    })
    firstName: string;


    @IsString()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'LastName',
        minimum: 1,
        maxLength: 80,
        required: true
    })
    lastName: string;

    @IsString()
    @MinLength(1)
    @MaxLength(60)
    @ApiProperty({
        description: 'Email',
        minimum: 1,
        maxLength: 80,
        required: true
    })
    email: string;

    @IsNumber()
    @ApiProperty({
        description: 'User id',
        required: false
    })
    userId: string;
}  

export class CommunPersonCreateDto {

    @IsString()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'First Name',
        minimum: 1,
        maxLength: 80,
        required: true
    })
    firstName: string;

    @IsString()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'LastName',
        minimum: 1,
        maxLength: 80,
        required: true
    })
    lastName: string;

    @IsString()
    @MinLength(1)
    @MaxLength(60)
    @ApiProperty({
        description: 'Email',
        minimum: 1,
        maxLength: 80,
        required: true
    })
    email: string;

    @IsNumber()
    @ApiProperty({
        description: 'User id',
        required: false
    })
    userId: string;
}

export class CommunPersonUpdateDto extends PartialType(CommunPersonCreateDto) {}