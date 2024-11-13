/*
  Warnings:

  - Added the required column `corp_nm` to the `Statistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Statistics" ADD COLUMN     "corp_nm" TEXT NOT NULL;
