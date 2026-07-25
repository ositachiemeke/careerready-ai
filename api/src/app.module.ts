import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TopicsModule } from './modules/curriculum/topics/topics.module';
import { ConfigModule } from '@nestjs/config';
import { AssessmentTypesModule } from './modules/curriculum/assessment-types/assessment-types.module';
import { ConceptsModule } from './modules/curriculum/concepts/concepts.module';
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AssessmentTypesModule,
    TopicsModule,
    ConceptsModule
  ],
})
export class AppModule {}
