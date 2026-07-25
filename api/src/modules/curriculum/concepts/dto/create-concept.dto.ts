import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    Min,
  } from 'class-validator';
  
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  import { ContentStatus, DifficultyLevel } from '@prisma/client';
  
  export class CreateConceptDto {
    @ApiProperty({
      description: 'Topic ID',
    })
    @IsUUID()
    topicId: string;
  
    @ApiProperty({
      example: 'NODE_EVENT_LOOP',
    })
    @IsString()
    @IsNotEmpty()
    code: string;
  
    @ApiProperty({
      example: 'Node.js Event Loop',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({
      example: 'node-event-loop',
    })
    @IsString()
    @IsNotEmpty()
    slug: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiPropertyOptional({
      enum: ContentStatus,
      default: ContentStatus.DRAFT,
    })
    @IsOptional()
    @IsEnum(ContentStatus)
    status?: ContentStatus;
  
    @ApiPropertyOptional({
      enum: DifficultyLevel,
      default: DifficultyLevel.BEGINNER,
    })
    @IsOptional()
    @IsEnum(DifficultyLevel)
    difficulty?: DifficultyLevel;
  
    @ApiPropertyOptional({
      example: 45,
      description: 'Estimated study duration in minutes',
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(600)
    estimatedMinutes?: number;
  
    @ApiPropertyOptional({
      example: 1,
    })
    @IsOptional()
    @IsInt()
    sortOrder?: number;
  }