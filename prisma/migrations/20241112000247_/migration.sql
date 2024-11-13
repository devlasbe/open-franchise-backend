-- CreateTable
CREATE TABLE "Franchaise" (
    "brand_nm" TEXT NOT NULL,
    "corp_nm" TEXT NOT NULL,
    "induty_l_nm" TEXT NOT NULL,
    "induty_m_nm" TEXT NOT NULL,

    CONSTRAINT "Franchaise_pkey" PRIMARY KEY ("brand_nm")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "brand_nm" TEXT NOT NULL,
    "yr" TEXT NOT NULL,
    "frcs_cnt" INTEGER NOT NULL,
    "new_cnt" INTEGER NOT NULL,
    "end_cnt" INTEGER NOT NULL,
    "cancel_cnt" INTEGER NOT NULL,
    "change_cnt" INTEGER NOT NULL,
    "avg_sales" INTEGER NOT NULL,
    "avg_sales_per_unit" INTEGER NOT NULL,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("brand_nm","yr")
);
