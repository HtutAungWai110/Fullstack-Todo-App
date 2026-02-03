/*
  Warnings:

  - You are about to drop the column `slug` on the `List` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "List_slug_key";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "slug";
