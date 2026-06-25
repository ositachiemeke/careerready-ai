import { PrismaClient } from '@prisma/client';

import { assessmentTypes } from '../data/assessment-types.data';

export async function seedAssessmentTypes(
  prisma: PrismaClient,
) {
  console.log('Seeding Assessment Types...');

  for (const assessmentType of assessmentTypes) {
    await prisma.assessmentType.upsert({
      where: {
        code: assessmentType.code,
      },

      update: {},

      create: assessmentType,
    });
  }

  console.log('Assessment Types Seeded');
}