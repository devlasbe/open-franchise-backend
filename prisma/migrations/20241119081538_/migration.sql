/*
  Warnings:

  - The primary key for the `Interior` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Interior" DROP CONSTRAINT "Interior_pkey",
ALTER COLUMN "jng_biz_crtra_yr" DROP NOT NULL,
ALTER COLUMN "jnghdqrtrs_mnno" DROP NOT NULL,
ALTER COLUMN "unit_ar_intrr_amt_scope_val" DROP NOT NULL,
ALTER COLUMN "stor_crtra_ar" DROP NOT NULL,
ALTER COLUMN "intrr_amt_scope_val" DROP NOT NULL,
ADD CONSTRAINT "Interior_pkey" PRIMARY KEY ("brand_nm");
