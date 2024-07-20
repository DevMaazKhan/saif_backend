/*
  Warnings:

  - Added the required column `accountTransactionID` to the `account_transaction_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account_transaction_items" ADD COLUMN     "accountTransactionID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "account_transaction_items" ADD CONSTRAINT "account_transaction_items_accountTransactionID_fkey" FOREIGN KEY ("accountTransactionID") REFERENCES "account_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
