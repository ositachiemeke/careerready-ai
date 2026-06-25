import { PrismaClient } from '@prisma/client';

import { seedAssessmentTypes } from './seeders/assessment-type.seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting CareerReady Seed...');

  await seedAssessmentTypes(prisma);

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