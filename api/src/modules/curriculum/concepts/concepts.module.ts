import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { TopicsModule } from '../topics/topics.module';

import { ConceptsController } from './controllers/concepts.controller';

import { ConceptsService } from './services/concepts.service';

import { ConceptRepository } from './repositories/concept.repository';

@Module({
  imports: [
    PrismaModule,
    TopicsModule,
  ],

  controllers: [
    ConceptsController,
  ],

  providers: [
    ConceptsService,
    ConceptRepository,
  ],

  exports: [
    ConceptRepository,
  ],
})
export class ConceptsModule {}