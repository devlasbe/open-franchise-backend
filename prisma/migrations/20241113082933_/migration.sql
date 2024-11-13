/*
  Warnings:

  - You are about to drop the `Franchaise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Franchaise";

-- CreateTable
CREATE TABLE "Franchise" (
    "brand_nm" TEXT NOT NULL,
    "corp_nm" TEXT NOT NULL,
    "induty_lclas_nm" TEXT NOT NULL,
    "induty_mclas_nm" TEXT NOT NULL,

    CONSTRAINT "Franchise_pkey" PRIMARY KEY ("brand_nm")
);

-- CreateIndex
CREATE INDEX "brand_name_index" ON "Franchise"("brand_nm");
