-- CreateTable
CREATE TABLE "Head" (
    "hmpg_urladr" TEXT,
    "area_nm" TEXT NOT NULL,
    "jng_biz_crtra_yr" TEXT NOT NULL,
    "jnghdqrtrs_mnno" TEXT NOT NULL,
    "jnghdqrtrs_conm_nm" TEXT NOT NULL,
    "brno" TEXT NOT NULL,
    "crno" TEXT NOT NULL,
    "indvdl_corp_se_cd" TEXT NOT NULL,
    "bzmn_rgs_date" TEXT NOT NULL,
    "corp_rg_date" TEXT NOT NULL,
    "jnghdqrtrs_rprs_telno" TEXT NOT NULL,
    "jnghdqrtrs_rprs_fxno" TEXT NOT NULL,
    "jnghdqrtrs_rprsv_nm" TEXT NOT NULL,
    "jnghdqrtrs_ozip" TEXT NOT NULL,
    "lctn_addr" TEXT NOT NULL,
    "lctn_daddr" TEXT NOT NULL,
    "brand_cnt" INTEGER NOT NULL,
    "afflts_cnt" INTEGER NOT NULL,
    "jng_inst_nm" TEXT NOT NULL,
    "ent_scale_nm" TEXT NOT NULL,

    CONSTRAINT "Head_pkey" PRIMARY KEY ("jnghdqrtrs_mnno")
);

-- CreateIndex
CREATE INDEX "Head_jnghdqrtrs_mnno_idx" ON "Head"("jnghdqrtrs_mnno");
