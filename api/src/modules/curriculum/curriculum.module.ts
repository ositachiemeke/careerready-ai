import { Module } from '@nestjs/common';
import { AssessmentTypesModule } from './assessment-types/assessment-types.module';

@Module({
  imports: [AssessmentTypesModule]
})
export class CurriculumModule {}
