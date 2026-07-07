import { Injectable } from '@nestjs/common';
import { Prisma, Topic } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { BaseRepository } from '../../../../common/repositories/base.repository';

@Injectable()
export class TopicRepository extends BaseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(data: Prisma.TopicCreateInput) {
    return this.prisma.topic.create({
      data,
      include: {
        assessmentType: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.topic.findFirst({
      where: {
        id,
        ...this.activeRecordFilter(),
      },
      include: {
        assessmentType: true,
      },
    });
  }

  async findByCode(code: string) {
    return this.prisma.topic.findFirst({
      where: {
        code,
        ...this.activeRecordFilter(),
      },
      include: {
        assessmentType: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.topic.findFirst({
      where: {
        slug,
        ...this.activeRecordFilter(),
      },
      include: {
        assessmentType: true,
      },
    });
  }

  async findMany() {
    return this.prisma.topic.findMany({
      where: {
        ...this.activeRecordFilter(),
      },
      include: {
        assessmentType: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async update(
    id: string,
    data: Prisma.TopicUpdateInput,
  ) {
    return this.prisma.topic.update({
      where: {
        id,
      },
      data,
      include: {
        assessmentType: true,
      },
    });
  }

  async softDelete(id: string) {
    return this.prisma.topic.update({
      where: {
        id,
      },
      data: this.softDeletePayload(),
    });
  }

  async restore(id: string) {
    return this.prisma.topic.update({
      where: {
        id,
      },
      data: this.restorePayload(),
      include: {
        assessmentType: true,
      }
    });
  }
}