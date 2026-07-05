import { PartialType } from '@nestjs/mapped-types';
import { CreateAssessmentTypeDto } from './create-assessment-type.dto';

export class UpdateAssessmentTypeDto extends PartialType(
  CreateAssessmentTypeDto,
) {}