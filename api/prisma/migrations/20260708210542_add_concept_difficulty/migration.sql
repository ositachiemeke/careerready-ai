-- CreateEnum
CREATE TYPE "public"."DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "public"."concepts" ADD COLUMN     "difficulty" "public"."DifficultyLevel" NOT NULL DEFAULT 'BEGINNER',
ADD COLUMN     "estimatedMinutes" INTEGER;

-- CreateIndex
CREATE INDEX "concepts_status_idx" ON "public"."concepts"("status");

-- CreateIndex
CREATE INDEX "concepts_difficulty_idx" ON "public"."concepts"("difficulty");
