/*
  Warnings:

  - The `stor_crtra_ar` column on the `Interior` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Interior" DROP COLUMN "stor_crtra_ar",
ADD COLUMN     "stor_crtra_ar" INTEGER;
