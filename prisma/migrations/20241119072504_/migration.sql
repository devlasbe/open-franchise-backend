/*
  Warnings:

  - The primary key for the `Brand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `corp_nm` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `induty_mclas_nm` on the `Brand` table. All the data in the column will be lost.
  - Added the required column `brand_mnno` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brno` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crno` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `induty_mlsfc_nm` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jng_biz_crtra_yr` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jng_biz_strt_date` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jnghdqrtrs_mnno` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jnghdqrtrs_rprsv_nm` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majr_gds_nm` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_pkey",
DROP COLUMN "corp_nm",
DROP COLUMN "induty_mclas_nm",
ADD COLUMN     "brand_mnno" TEXT NOT NULL,
ADD COLUMN     "brno" TEXT NOT NULL,
ADD COLUMN     "crno" TEXT NOT NULL,
ADD COLUMN     "induty_mlsfc_nm" TEXT NOT NULL,
ADD COLUMN     "jng_biz_crtra_yr" TEXT NOT NULL,
ADD COLUMN     "jng_biz_strt_date" TEXT NOT NULL,
ADD COLUMN     "jnghdqrtrs_mnno" TEXT NOT NULL,
ADD COLUMN     "jnghdqrtrs_rprsv_nm" TEXT NOT NULL,
ADD COLUMN     "majr_gds_nm" TEXT NOT NULL,
ADD CONSTRAINT "Brand_pkey" PRIMARY KEY ("brand_mnno");

-- RenameIndex
ALTER INDEX "brand_name_index" RENAME TO "franchise_brand_year_index";
