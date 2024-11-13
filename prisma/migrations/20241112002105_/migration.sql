/*
  Warnings:

  - You are about to drop the `Statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Statistics";

-- CreateTable
CREATE TABLE "Statistic" (
    "brand_nm" TEXT NOT NULL,
    "corp_nm" TEXT NOT NULL,
    "yr" TEXT NOT NULL,
    "frcs_cnt" INTEGER NOT NULL,
    "new_cnt" INTEGER NOT NULL,
    "end_cnt" INTEGER NOT NULL,
    "cancel_cnt" INTEGER NOT NULL,
    "change_cnt" INTEGER NOT NULL,
    "avg_sales" INTEGER NOT NULL,
    "avg_sales_per_unit" INTEGER NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("brand_nm","yr")
);
