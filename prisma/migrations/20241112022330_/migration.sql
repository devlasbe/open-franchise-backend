-- DropIndex
DROP INDEX "start_up_brand_name_index";

-- CreateIndex
CREATE INDEX "start_up_brand_name_year_index" ON "Startup"("brand_nm", "yr");
