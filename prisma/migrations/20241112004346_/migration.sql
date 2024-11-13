/*
  Warnings:

  - You are about to drop the column `induty_l_nm` on the `Franchaise` table. All the data in the column will be lost.
  - You are about to drop the column `induty_m_nm` on the `Franchaise` table. All the data in the column will be lost.
  - You are about to drop the column `avg_sales` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `avg_sales_per_unit` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `cancel_cnt` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `change_cnt` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `end_cnt` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `new_cnt` on the `Statistic` table. All the data in the column will be lost.
  - Added the required column `induty_lclas_nm` to the `Franchaise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `induty_mclas_nm` to the `Franchaise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ar_unit_avrg_sls_amt` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avrg_sls_amt` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ctrt_cncltn_cnt` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ctrt_end_cnt` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_frcs_rgs_cnt` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nm_chg_cnt` to the `Statistic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Franchaise" DROP COLUMN "induty_l_nm",
DROP COLUMN "induty_m_nm",
ADD COLUMN     "induty_lclas_nm" TEXT NOT NULL,
ADD COLUMN     "induty_mclas_nm" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Statistic" DROP COLUMN "avg_sales",
DROP COLUMN "avg_sales_per_unit",
DROP COLUMN "cancel_cnt",
DROP COLUMN "change_cnt",
DROP COLUMN "end_cnt",
DROP COLUMN "new_cnt",
ADD COLUMN     "ar_unit_avrg_sls_amt" INTEGER NOT NULL,
ADD COLUMN     "avrg_sls_amt" INTEGER NOT NULL,
ADD COLUMN     "ctrt_cncltn_cnt" INTEGER NOT NULL,
ADD COLUMN     "ctrt_end_cnt" INTEGER NOT NULL,
ADD COLUMN     "new_frcs_rgs_cnt" INTEGER NOT NULL,
ADD COLUMN     "nm_chg_cnt" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "brand_name_index" ON "Franchaise"("brand_nm");

-- CreateIndex
CREATE INDEX "brand_name_year_index" ON "Statistic"("brand_nm", "yr");
