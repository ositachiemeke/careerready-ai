import { PrismaClient } from '@prisma/client';

import { seedAssessmentTypes } from './seeders/assessment-type.seeder';
import { seedTopics } from './seeders/topic.seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting CareerReady AI Seed...');

  await seedAssessmentTypes(prisma);

  await seedTopics(prisma);

  console.log('Seed Complete');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });