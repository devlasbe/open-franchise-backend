/*
  Warnings:

  - You are about to drop the `Franchise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Franchise";

-- CreateTable
CREATE TABLE "Brand" (
    "brand_nm" TEXT NOT NULL,
    "corp_nm" TEXT NOT NULL,
    "induty_lclas_nm" TEXT NOT NULL,
    "induty_mclas_nm" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("brand_nm")
);

-- CreateIndex
CREATE INDEX "brand_name_index" ON "Brand"("brand_nm");
