import { Module } from '@nestjs/common';
import { AssessmentTypesController } from './controllers/assessment-types.controller';
import { AssessmentTypesService } from './services/assessment-types.service';
import { AssessmentTypeRepository } from './repositories/assessment-type.repository';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    AssessmentTypesController,
  ],
  providers: [
    AssessmentTypesService,
    AssessmentTypeRepository,
  ],
  exports: [
    AssessmentTypeRepository,
  ],
})
export class AssessmentTypesModule {}
