import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    Min,
  } from 'class-validator';
  
  import { Type } from 'class-transformer';
  import { ApiPropertyOptional } from '@nestjs/swagger';
  import { ContentStatus } from '@prisma/client';
  
  import { SortOrder } from '../../../../common/enums/sort-order.enum';
  
  export class ListTopicsDto {
    @ApiPropertyOptional({
      default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page = 1;
  
    @ApiPropertyOptional({
      default: 20,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit = 20;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    search?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    assessmentTypeId?: string;
  
    @ApiPropertyOptional({
      enum: ContentStatus,
    })
    @IsOptional()
    @IsEnum(ContentStatus)
    status?: ContentStatus;
  
    @ApiPropertyOptional({
      default: 'sortOrder',
    })
    @IsOptional()
    @IsString()
    sort = 'sortOrder';
  
    @ApiPropertyOptional({
      enum: SortOrder,
      default: SortOrder.ASC,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    order: SortOrder = SortOrder.ASC;
  }