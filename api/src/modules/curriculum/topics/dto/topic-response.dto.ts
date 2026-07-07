import { ApiProperty } from '@nestjs/swagger';

export class AssessmentTypeSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;
}

export class TopicResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({
    nullable: true,
  })
  description?: string;

  @ApiProperty()
  sortOrder: number;

  @ApiProperty({
    type: AssessmentTypeSummaryDto,
  })
  assessmentType: AssessmentTypeSummaryDto;
}