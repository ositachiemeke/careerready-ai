import { Module } from '@nestjs/common';
import { AssessmentTypesController } from './controllers/assessment-types.controller';
import { AssessmentTypesService } from './services/assessment-types.service';
import { AssessmentTypeRepository } from './repositories/assessment-type.repository';

@Module({
  controllers: [AssessmentTypesController],
  providers: [AssessmentTypesService, AssessmentTypeRepository]
})
export class AssessmentTypesModule {}
