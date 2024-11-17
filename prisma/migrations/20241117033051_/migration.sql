/*
  Warnings:

  - Added the required column `induty_lclas_nm` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `induty_mclas_nm` to the `Statistic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Statistic" ADD COLUMN     "induty_lclas_nm" TEXT NOT NULL,
ADD COLUMN     "induty_mclas_nm" TEXT NOT NULL;
