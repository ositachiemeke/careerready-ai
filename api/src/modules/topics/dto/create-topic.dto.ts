import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    Min,
  } from 'class-validator';
  
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  export class CreateTopicDto {
    @ApiProperty({
      example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
      description: 'Assessment Type ID',
    })
    @IsUUID()
    assessmentTypeId: string;
  
    @ApiProperty({
      example: 'PERCENTAGES',
      description: 'Unique topic code',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    code: string;
  
    @ApiProperty({
      example: 'Percentages',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
  
    @ApiProperty({
      example: 'percentages',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    slug: string;
  
    @ApiPropertyOptional({
      example: 'Percentage calculations and applications',
    })
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiPropertyOptional({
      example: 1,
      default: 0,
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    sortOrder?: number = 0;
  }