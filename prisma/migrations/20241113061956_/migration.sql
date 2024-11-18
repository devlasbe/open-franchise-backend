-- CreateTable
CREATE TABLE "Category" (
    "induty_lclas_nm" TEXT NOT NULL,
    "induty_mclas_nm" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("induty_lclas_nm","induty_mclas_nm")
);
