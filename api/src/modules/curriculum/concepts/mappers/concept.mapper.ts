import { Prisma } from '@prisma/client';

import { CreateConceptDto } from '../dto/create-concept.dto';
import { UpdateConceptDto } from '../dto/update-concept.dto';

export class ConceptMapper {
  static toCreate(
    dto: CreateConceptDto,
  ): Prisma.ConceptCreateInput {
    return {
      code: dto.code,
      name: dto.name,
      slug: dto.slug,
      description: dto.description,

      status: dto.status,
      difficulty: dto.difficulty,
      estimatedMinutes: dto.estimatedMinutes,
      sortOrder: dto.sortOrder,

      topic: {
        connect: {
          id: dto.topicId,
        },
      },
    };
  }

  static toUpdate(
    dto: UpdateConceptDto,
  ): Prisma.ConceptUpdateInput {
    return {
      ...(dto.code !== undefined && {
        code: dto.code,
      }),

      ...(dto.name !== undefined && {
        name: dto.name,
      }),

      ...(dto.slug !== undefined && {
        slug: dto.slug,
      }),

      ...(dto.description !== undefined && {
        description: dto.description,
      }),

      ...(dto.status !== undefined && {
        status: dto.status,
      }),

      ...(dto.difficulty !== undefined && {
        difficulty: dto.difficulty,
      }),

      ...(dto.estimatedMinutes !== undefined && {
        estimatedMinutes: dto.estimatedMinutes,
      }),

      ...(dto.sortOrder !== undefined && {
        sortOrder: dto.sortOrder,
      }),

      ...(dto.topicId !== undefined && {
        topic: {
          connect: {
            id: dto.topicId,
          },
        },
      }),
    };
  }

  static toResponse<T>(concept: T): T {
    return concept;
  }
}