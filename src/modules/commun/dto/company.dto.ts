import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CommunCompanyDto {
    
    @IsNumber()
    @ApiProperty({  description: 'Id database'  })
    id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'Value',
        minimum: 1,
        maxLength: 150,
        required: true
    })
    name: string;

    @IsBoolean()
    @ApiProperty({
         description: 'Status active/inactive'
    })
    isActive: boolean;


    @IsNumber()
    @ApiProperty({
        description: 'Company successor',
        required: false
    })
    companySuccessorId: number;
}  

export class CommunCompanyCreateDto {


    @IsString()
    @MinLength(1)
    @MaxLength(80)
    @ApiProperty({
        description: 'Value',
        minimum: 1,
        maxLength: 150,
        required: true
    })
    name: string;

    @IsBoolean()
    @ApiProperty({
         description: 'Status active/inactive'
    })
    isActive: boolean;


    @IsNumber()
    @ApiProperty({
        description: 'Company successor',
        required: false
    })
    companySuccessorId: number;

}

export class CommunCompanyUpdateDto extends PartialType(CommunCompanyCreateDto) {}