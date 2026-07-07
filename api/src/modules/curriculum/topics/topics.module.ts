import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { AssessmentTypesModule } from '../assessment-types/assessment-types.module';

import { TopicsController } from './controllers/topics.controller';
import { TopicsService } from './services/topics.service';
import { TopicRepository } from './repositories/topic.repository';

@Module({
  imports: [
    PrismaModule,
    AssessmentTypesModule,
  ],
  controllers: [
    TopicsController,
  ],
  providers: [
    TopicsService,
    TopicRepository,
  ],
  exports: [
    TopicsService,
    TopicRepository,
  ],
})
export class TopicsModule {}