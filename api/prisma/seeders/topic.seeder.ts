import { PrismaClient } from '@prisma/client';

import { topics } from '../data/topics.data';

export async function seedTopics(
  prisma: PrismaClient,
): Promise<void> {
  console.log('Seeding Topics...');

  for (const topic of topics) {
    const assessmentType =
      await prisma.assessmentType.findUnique({
        where: {
          code: topic.assessmentTypeCode,
        },
      });

    if (!assessmentType) {
      throw new Error(
        `Assessment Type not found: ${topic.assessmentTypeCode}`,
      );
    }

    await prisma.topic.upsert({
      where: {
        code: topic.code,
      },

      update: {
        name: topic.name,
        slug: topic.slug,
        description: topic.description,
      },

      create: {
        code: topic.code,
        name: topic.name,
        slug: topic.slug,
        description: topic.description,
        assessmentTypeId: assessmentType.id,
      },
    });
  }

  console.log('Topics Seeded');
}