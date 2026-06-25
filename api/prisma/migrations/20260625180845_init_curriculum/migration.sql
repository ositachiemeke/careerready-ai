-- CreateEnum
CREATE TYPE "public"."ContentStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."RelationshipType" AS ENUM ('PREREQUISITE', 'RELATED', 'ADVANCED_FORM');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."assessment_types" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "assessment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."topics" (
    "id" TEXT NOT NULL,
    "assessmentTypeId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."concepts" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "concepts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."frameworks" (
    "id" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "frameworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."framework_steps" (
    "id" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "framework_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."concept_relationships" (
    "id" TEXT NOT NULL,
    "parentConceptId" TEXT NOT NULL,
    "childConceptId" TEXT NOT NULL,
    "relationshipType" "public"."RelationshipType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "concept_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_types_code_key" ON "public"."assessment_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_types_slug_key" ON "public"."assessment_types"("slug");

-- CreateIndex
CREATE INDEX "assessment_types_code_idx" ON "public"."assessment_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "topics_code_key" ON "public"."topics"("code");

-- CreateIndex
CREATE UNIQUE INDEX "topics_slug_key" ON "public"."topics"("slug");

-- CreateIndex
CREATE INDEX "topics_assessmentTypeId_idx" ON "public"."topics"("assessmentTypeId");

-- CreateIndex
CREATE INDEX "topics_code_idx" ON "public"."topics"("code");

-- CreateIndex
CREATE UNIQUE INDEX "concepts_code_key" ON "public"."concepts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "concepts_slug_key" ON "public"."concepts"("slug");

-- CreateIndex
CREATE INDEX "concepts_topicId_idx" ON "public"."concepts"("topicId");

-- CreateIndex
CREATE INDEX "concepts_code_idx" ON "public"."concepts"("code");

-- CreateIndex
CREATE INDEX "frameworks_conceptId_idx" ON "public"."frameworks"("conceptId");

-- CreateIndex
CREATE UNIQUE INDEX "framework_steps_frameworkId_stepNumber_key" ON "public"."framework_steps"("frameworkId", "stepNumber");

-- CreateIndex
CREATE INDEX "concept_relationships_parentConceptId_idx" ON "public"."concept_relationships"("parentConceptId");

-- CreateIndex
CREATE INDEX "concept_relationships_childConceptId_idx" ON "public"."concept_relationships"("childConceptId");

-- AddForeignKey
ALTER TABLE "public"."topics" ADD CONSTRAINT "topics_assessmentTypeId_fkey" FOREIGN KEY ("assessmentTypeId") REFERENCES "public"."assessment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."concepts" ADD CONSTRAINT "concepts_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "public"."topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."frameworks" ADD CONSTRAINT "frameworks_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "public"."concepts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."framework_steps" ADD CONSTRAINT "framework_steps_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "public"."frameworks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."concept_relationships" ADD CONSTRAINT "concept_relationships_parentConceptId_fkey" FOREIGN KEY ("parentConceptId") REFERENCES "public"."concepts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."concept_relationships" ADD CONSTRAINT "concept_relationships_childConceptId_fkey" FOREIGN KEY ("childConceptId") REFERENCES "public"."concepts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
