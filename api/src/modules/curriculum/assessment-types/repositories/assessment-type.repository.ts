import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { BaseRepository } from '../../../../common/repositories/base.repository';

@Injectable()
export class AssessmentTypeRepository extends BaseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(
    data: Prisma.AssessmentTypeCreateInput,
  ) {
    return this.prisma.assessmentType.create({
      data,
    });
  }

  async findMany() {
    return this.prisma.assessmentType.findMany({
      where: this.activeRecordFilter(),
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.assessmentType.findFirst({
      where: {
        id,
        ...this.activeRecordFilter(),
      },
    });
  }

  async findByCode(code: string) {
    return this.prisma.assessmentType.findFirst({
      where: {
        code,
        ...this.activeRecordFilter(),
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.assessmentType.findFirst({
      where: {
        slug,
        ...this.activeRecordFilter(),
      },
    });
  }

  async update(
    id: string,
    data: Prisma.AssessmentTypeUpdateInput,
  ) {
    return this.prisma.assessmentType.update({
      where: {
        id,
      },
      data,
    });
  }

  async softDelete(id: string) {
    return this.prisma.assessmentType.update({
      where: {
        id,
      },
      data: this.softDeletePayload(),
    });
  }

  async restore(id: string) {
    return this.prisma.assessmentType.update({
      where: {
        id,
      },
      data: this.restorePayload(),
    });
  }
}