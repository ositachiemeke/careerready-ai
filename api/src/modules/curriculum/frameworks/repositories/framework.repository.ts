import { Injectable } from '@nestjs/common';
import { Framework, Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { BaseRepository } from '../../../../common/repositories/base.repository';

@Injectable()
export class FrameworkRepository extends BaseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(
    data: Prisma.FrameworkCreateInput,
  ): Promise<Framework> {
    return this.prisma.framework.create({
      data,
      include: {
        concept: true,
        frameworkSteps: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.framework.findFirst({
      where: {
        id,
        ...this.activeRecordFilter(),
      },
      include: {
        concept: true,
        frameworkSteps: {
          orderBy: {
            stepNumber: 'asc',
          },
        },
      },
    });
  }

  async findByIdIncludingDeleted(id: string) {
    return this.prisma.framework.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCode(code: string) {
    return this.prisma.framework.findFirst({
      where: {
        code,
        ...this.activeRecordFilter(),
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.framework.findFirst({
      where: {
        slug,
        ...this.activeRecordFilter(),
      },
    });
  }

  async findByConceptAndName(
    conceptId: string,
    name: string,
  ) {
    return this.prisma.framework.findFirst({
      where: {
        conceptId,
        name,
        ...this.activeRecordFilter(),
      },
    });
  }

  async findMany() {
    return this.prisma.framework.findMany({
      where: {
        ...this.activeRecordFilter(),
      },
      include: {
        concept: true,
        frameworkSteps: {
          orderBy: {
            stepNumber: 'asc',
          },
        },
      },
      orderBy: [
        {
          sortOrder: 'asc',
        },
        {
          name: 'asc',
        },
      ],
    });
  }

  async update(
    id: string,
    data: Prisma.FrameworkUpdateInput,
  ) {
    return this.prisma.framework.update({
      where: {
        id,
      },
      data,
      include: {
        concept: true,
        frameworkSteps: {
          orderBy: {
            stepNumber: 'asc',
          },
        },
      },
    });
  }

  async softDelete(id: string) {
    return this.prisma.framework.update({
      where: {
        id,
      },
      data: this.softDeletePayload(),
    });
  }

  async restore(id: string) {
    return this.prisma.framework.update({
      where: {
        id,
      },
      data: this.restorePayload(),
      include: {
        concept: true,
        frameworkSteps: {
          orderBy: {
            stepNumber: 'asc',
          },
        },
      },
    });
  }
}