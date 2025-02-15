/*
  Warnings:

  - The `questions` column on the `Quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "questions",
ADD COLUMN     "questions" JSONB NOT NULL DEFAULT '[]';
