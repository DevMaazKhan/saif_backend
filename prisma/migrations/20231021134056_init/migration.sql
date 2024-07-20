/*
  Warnings:

  - You are about to drop the `account_transaction_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `credit` to the `account_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debit` to the `account_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account_transaction_items" DROP CONSTRAINT "account_transaction_items_accountTransactionID_fkey";

-- AlterTable
ALTER TABLE "account_transaction" ADD COLUMN     "credit" INTEGER NOT NULL,
ADD COLUMN     "debit" INTEGER NOT NULL;

-- DropTable
DROP TABLE "account_transaction_items";
