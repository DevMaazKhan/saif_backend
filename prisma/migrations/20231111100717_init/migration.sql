/*
  Warnings:

  - Added the required column `acType` to the `account_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account_transaction" ADD COLUMN     "acType" TEXT NOT NULL;
