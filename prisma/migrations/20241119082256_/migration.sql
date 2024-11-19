/*
  Warnings:

  - The primary key for the `Interior` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Interior" DROP CONSTRAINT "Interior_pkey",
ADD CONSTRAINT "Interior_pkey" PRIMARY KEY ("brand_mnno");
