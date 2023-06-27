import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CommunCatalogueDto {
    @IsNumber()
    @ApiProperty({  description: 'Id database'  })
    id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({ description: 'Group name'  })
    group: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({ description: 'Value'  })
    value: string;

    @IsBoolean()
    @ApiProperty({ description: 'Status active/inactive'  })
    isActive: boolean;

    @IsString()
    @MaxLength(150)
    @ApiProperty({ description: 'Description'  })
    description: string;
}  

export class CommunCatalogueCreateDto {

    @IsString()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'Group name',
        minimum: 5,
        maxLength: 80
    })
    group: string;

    @IsString()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'Value',
        minimum: 1,
        maxLength: 80
    })
    value: string;

    @IsBoolean()
    @ApiProperty({
         description: 'Status active/inactive'
    })
    isActive: boolean;

    @IsString()
    @MaxLength(150)
    @ApiProperty({
        description: 'Description',
        minimum: 1,
        maxLength: 150,
        required: false
    })
    description: string;

}

export class CommunCatalogueUpdateDto extends PartialType(CommunCatalogueCreateDto) {}