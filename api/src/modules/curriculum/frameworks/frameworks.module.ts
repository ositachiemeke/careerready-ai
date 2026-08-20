import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { FrameworksController } from './controllers/frameworks.controller';

import { FrameworksService } from './services/frameworks.service';

import { FrameworkRepository } from './repositories/framework.repository';
import { ConceptRepository } from '../concepts/repositories/concept.repository';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    FrameworksController,
  ],
  providers: [
    FrameworksService,
    FrameworkRepository,
    ConceptRepository,
  ],
  exports: [
    FrameworkRepository,
  ],
})
export class FrameworksModule {}