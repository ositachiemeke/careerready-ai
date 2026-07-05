import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [CurriculumModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
