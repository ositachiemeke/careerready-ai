import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { BaseRepository } from '../../../../common/repositories/base.repository';

const conceptIncludes = {
  topic: true,
  frameworks: true,
} satisfies Prisma.ConceptInclude;

@Injectable()
export class ConceptRepository extends BaseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(
    data: Prisma.ConceptCreateInput,
  ) {
    return this.prisma.concept.create({
      data,
      include: conceptIncludes,
    });
  }

  async findMany() {
    return this.prisma.concept.findMany({
      where: {
        ...this.activeRecordFilter(),
      },
      include: conceptIncludes,
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async findById(
    id: string,
  ) {
    return this.prisma.concept.findFirst({
      where: {
        id,
        ...this.activeRecordFilter(),
      },
      include: conceptIncludes,
    });
  }

  async findByIdIncludingDeleted(
    id: string,
  ) {
    return this.prisma.concept.findUnique({
      where: {
        id,
      },
      include: conceptIncludes,
    });
  }

  async findByCode(
    code: string,
  ) {
    return this.prisma.concept.findFirst({
      where: {
        code,
        ...this.activeRecordFilter(),
      },
      include: conceptIncludes,
    });
  }

  async findBySlug(
    slug: string,
  ) {
    return this.prisma.concept.findFirst({
      where: {
        slug,
        ...this.activeRecordFilter(),
      },
      include: conceptIncludes,
    });
  }

  async update(
    id: string,
    data: Prisma.ConceptUpdateInput,
  ) {
    return this.prisma.concept.update({
      where: {
        id,
      },
      data,
      include: conceptIncludes,
    });
  }

  async softDelete(
    id: string,
  ) {
    return this.prisma.concept.update({
      where: {
        id,
      },
      data: this.softDeletePayload(),
    });
  }

  async restore(
    id: string,
  ) {
    return this.prisma.concept.update({
      where: {
        id,
      },
      data: this.restorePayload(),
      include: conceptIncludes,
    });
  }
}