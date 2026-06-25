import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAssessmentTypeDto } from '../dto/create-assessment-type.dto';
import { UpdateAssessmentTypeDto } from '../dto/update-assessment-type.dto';

@Injectable()
export class AssessmentTypeRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(data: CreateAssessmentTypeDto) {
    return this.prisma.assessmentType.create({
      data,
    });
  }

  findAll() {
    return this.prisma.assessmentType.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.assessmentType.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
  
  update(
    id: string,
    data: UpdateAssessmentTypeDto,
  ) {
    return this.prisma.assessmentType.update({
      where: {
        id,
      },
      data,
    });
  }
  
  softDelete(id: string) {
    return this.prisma.assessmentType.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}