import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class SecurityModuleDto {
    @IsNumber()
    @ApiProperty({  description: 'Id database'  })
    id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({ description: 'Name of the module'  })
    name: string;
}  

export class SecurityModuleCreateDto {

    @IsString()
    @MinLength(1)
    @MaxLength(150)
    @ApiProperty({
        type: String,
        description: 'Name of the module',
        minimum: 5,
        maxLength: 80
    })
    name: string;
}

export class SecurityModuleUpdateDto extends PartialType(SecurityModuleCreateDto) {}