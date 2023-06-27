import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class SecurityAccessDto {
    @IsNumber()
    @ApiProperty({  description: 'Id database'  })
    id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({ description: 'Unique code to identify access'  })
    codeAccess: string;

    @IsString()
    @MinLength(1)
    @MaxLength(150)
    @ApiProperty({ description: 'Description to identify access' })
    description: string;
}  

export class SecurityAccessCreateDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'Unique code to identify access',
        minimum: 1,
        maxLength: 80
    })
    codeAccess: string;

    @IsString()
    @MinLength(1)
    @MaxLength(150)
    @ApiProperty({
        description: 'Description to identify access',
        minimum: 1,
        maxLength: 150
    })
    description: string;
}

export class SecurityAccessUpdateDto extends PartialType(SecurityAccessCreateDto) {}