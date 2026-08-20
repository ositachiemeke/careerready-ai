import { Prisma } from '@prisma/client';
import { SlugUtil } from '../../../../common/utils/slug.util';
import { CreateFrameworkDto } from '../dto/create-framework.dto';
import { UpdateFrameworkDto } from '../dto/update-framework.dto';

export class FrameworkMapper {
  static toCreate(
    dto: CreateFrameworkDto,
  ): Prisma.FrameworkCreateInput {
    return {
      concept: {
        connect: {
          id: dto.conceptId,
        },
      },

      code: dto.code.trim().toUpperCase(),

      name: dto.name.trim(),

      slug: SlugUtil.generate(dto.name),

      description: dto.description?.trim(),

      recognitionPattern:
        dto.recognitionPattern?.trim(),

      learningObjective:
        dto.learningObjective?.trim(),

      strategySummary:
        dto.strategySummary?.trim(),

      commonMistakes:
        dto.commonMistakes?.trim(),

      hint: dto.hint?.trim(),

      isCore: dto.isCore ?? false,

      status: dto.status,

      sortOrder: dto.sortOrder ?? 0,
    };
  }

  static toUpdate(
    dto: UpdateFrameworkDto,
  ): Prisma.FrameworkUpdateInput {
    const data: Prisma.FrameworkUpdateInput = {};

    if (dto.conceptId) {
      data.concept = {
        connect: {
          id: dto.conceptId,
        },
      };
    }

    if (dto.code !== undefined) {
      data.code = dto.code.trim().toUpperCase();
    }

    if (dto.name !== undefined) {
      data.name = dto.name.trim();

      data.slug = SlugUtil.generate(dto.name);
    }

    if (dto.description !== undefined) {
      data.description = dto.description?.trim();
    }

    if (dto.recognitionPattern !== undefined) {
      data.recognitionPattern =
        dto.recognitionPattern?.trim();
    }

    if (dto.learningObjective !== undefined) {
      data.learningObjective =
        dto.learningObjective?.trim();
    }

    if (dto.strategySummary !== undefined) {
      data.strategySummary =
        dto.strategySummary?.trim();
    }

    if (dto.commonMistakes !== undefined) {
      data.commonMistakes =
        dto.commonMistakes?.trim();
    }

    if (dto.hint !== undefined) {
      data.hint = dto.hint?.trim();
    }

    if (dto.isCore !== undefined) {
      data.isCore = dto.isCore;
    }

    if (dto.status !== undefined) {
      data.status = dto.status;
    }

    if (dto.sortOrder !== undefined) {
      data.sortOrder = dto.sortOrder;
    }

    return data;
  }

  static toResponse(framework: any) {
    return framework;
  }
}