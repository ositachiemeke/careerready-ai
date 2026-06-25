import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurriculumModule } from './curriculum/curriculum.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CurriculumModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
