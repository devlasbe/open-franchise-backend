-- CreateTable
CREATE TABLE "Startup" (
    "brand_nm" TEXT NOT NULL,
    "corp_nm" TEXT NOT NULL,
    "yr" TEXT NOT NULL,
    "induty_lclas_nm" TEXT NOT NULL,
    "induty_mclas_nm" TEXT NOT NULL,
    "jng_bzmn_jng_amt" INTEGER NOT NULL,
    "jng_bzmn_edu_amt" INTEGER NOT NULL,
    "jng_bzmn_etc_amt" INTEGER NOT NULL,
    "jng_bzmn_assrnc_amt" INTEGER NOT NULL,
    "smtn_amt" INTEGER NOT NULL,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("brand_nm")
);

-- CreateIndex
CREATE INDEX "start_up_brand_name_index" ON "Startup"("brand_nm");
