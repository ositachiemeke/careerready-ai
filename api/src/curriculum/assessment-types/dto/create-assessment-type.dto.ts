import {
    IsOptional,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateAssessmentTypeDto {
    @IsString()
    @MaxLength(100)
    code: string;
  
    @IsString()
    @MaxLength(100)
    name: string;
  
    @IsString()
    @MaxLength(150)
    slug: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  }