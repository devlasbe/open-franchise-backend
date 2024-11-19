-- CreateTable
CREATE TABLE "Interior" (
    "brand_nm" TEXT NOT NULL,
    "crrncy_unit_cd_nm" TEXT NOT NULL,
    "jng_biz_crtra_yr" TEXT NOT NULL,
    "brand_mnno" TEXT NOT NULL,
    "jnghdqrtrs_mnno" TEXT NOT NULL,
    "induty_lclas_nm" TEXT NOT NULL,
    "induty_mlsfc_nm" TEXT NOT NULL,
    "unit_ar_intrr_amt_scope_val" TEXT NOT NULL,
    "stor_crtra_ar" TEXT NOT NULL,
    "intrr_amt_scope_val" TEXT NOT NULL,

    CONSTRAINT "Interior_pkey" PRIMARY KEY ("brand_nm","unit_ar_intrr_amt_scope_val")
);

-- CreateIndex
CREATE INDEX "Interior_brand_nm_idx" ON "Interior"("brand_nm");
