/*
  Warnings:

  - A unique constraint covering the columns `[ac_type]` on the table `coa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coa_ac_type_key" ON "coa"("ac_type");
