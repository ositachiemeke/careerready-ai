import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    Min,
  } from 'class-validator';
  
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  import { ContentStatus } from '@prisma/client';
  
  export class CreateFrameworkDto {
    @ApiProperty({
      description: 'Concept ID this framework belongs to',
      format: 'uuid',
    })
    @IsUUID()
    conceptId: string;
  
    @ApiProperty({
      example: 'NUM-FD',
      description: 'Unique framework code',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    code: string;
  
    @ApiProperty({
      example: 'First Difference',
      description: 'Framework name',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
  
    @ApiPropertyOptional({
      description: 'Framework description',
    })
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiPropertyOptional({
      description: 'How to recognize questions using this framework',
    })
    @IsOptional()
    @IsString()
    recognitionPattern?: string;
  
    @ApiPropertyOptional({
      description: 'Learning objective for this framework',
    })
    @IsOptional()
    @IsString()
    learningObjective?: string;
  
    @ApiPropertyOptional({
      description: 'High-level problem-solving strategy',
    })
    @IsOptional()
    @IsString()
    strategySummary?: string;
  
    @ApiPropertyOptional({
      description: 'Common mistakes learners make',
    })
    @IsOptional()
    @IsString()
    commonMistakes?: string;
  
    @ApiPropertyOptional({
      description: 'Hint to guide learners before revealing the solution',
    })
    @IsOptional()
    @IsString()
    hint?: string;
  
    @ApiPropertyOptional({
      description: 'Whether this is a core framework',
      default: false,
    })
    @IsOptional()
    @IsBoolean()
    isCore?: boolean;
  
    @ApiPropertyOptional({
      enum: ContentStatus,
      default: ContentStatus.DRAFT,
    })
    @IsOptional()
    @IsEnum(ContentStatus)
    status?: ContentStatus;
  
    @ApiPropertyOptional({
      description: 'Display order',
      default: 0,
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    sortOrder?: number;
  }