/*
  Warnings:

  - You are about to drop the column `credit` on the `coa` table. All the data in the column will be lost.
  - You are about to drop the column `debit` on the `coa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "coa" DROP COLUMN "credit",
DROP COLUMN "debit";
