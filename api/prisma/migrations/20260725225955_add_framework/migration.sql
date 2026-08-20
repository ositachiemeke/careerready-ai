/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `frameworks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `frameworks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `frameworks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `frameworks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."framework_steps" ADD COLUMN     "commonMistake" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "expectedOutcome" TEXT,
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "hint" TEXT,
ADD COLUMN     "status" "public"."ContentStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "public"."frameworks" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "commonMistakes" TEXT,
ADD COLUMN     "hint" TEXT,
ADD COLUMN     "isCore" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "learningObjective" TEXT,
ADD COLUMN     "recognitionPattern" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "strategySummary" TEXT;

-- CreateIndex
CREATE INDEX "framework_steps_frameworkId_idx" ON "public"."framework_steps"("frameworkId");

-- CreateIndex
CREATE INDEX "framework_steps_status_idx" ON "public"."framework_steps"("status");

-- CreateIndex
CREATE UNIQUE INDEX "frameworks_code_key" ON "public"."frameworks"("code");

-- CreateIndex
CREATE UNIQUE INDEX "frameworks_slug_key" ON "public"."frameworks"("slug");

-- CreateIndex
CREATE INDEX "frameworks_code_idx" ON "public"."frameworks"("code");

-- CreateIndex
CREATE INDEX "frameworks_slug_idx" ON "public"."frameworks"("slug");

-- CreateIndex
CREATE INDEX "frameworks_status_idx" ON "public"."frameworks"("status");
