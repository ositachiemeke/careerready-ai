import { Module } from '@nestjs/common';
import { AssessmentTypesModule } from './assessment-types/assessment-types.module';
import { TopicsModule } from './topics/topics.module';
import { ConceptsModule } from './concepts/concepts.module';
import { FrameworksModule } from './frameworks/frameworks.module';

@Module({
  imports: [
    AssessmentTypesModule,
    TopicsModule,
    ConceptsModule,
    FrameworksModule,
  ],
})
export class CurriculumModule {}
