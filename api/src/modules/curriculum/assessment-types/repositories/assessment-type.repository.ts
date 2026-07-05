import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import { BaseRepository } from '../../../../common/repositories/base.repository';

import { CreateAssessmentTypeDto } from '../dto/create-assessment-type.dto';
import { UpdateAssessmentTypeDto } from '../dto/update-assessment-type.dto';

@Injectable()
export class AssessmentTypeRepository extends BaseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  create(data: CreateAssessmentTypeDto) {
    return this.prisma.assessmentType.create({
      data,
    });
  }

  findAll() {
    return this.prisma.assessmentType.findMany({
      where: this.activeRecordFilter(),

      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.assessmentType.findFirst({
      where: {
        id,
        ...this.activeRecordFilter(),
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
      data: this.softDeletePayload(),
    });
  }
}