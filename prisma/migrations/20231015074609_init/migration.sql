/*
  Warnings:

  - You are about to alter the column `credit` on the `account_transaction_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `debit` on the `account_transaction_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `credit` on the `coa` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `debit` on the `coa` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to drop the column `doc_type` on the `document_counter` table. All the data in the column will be lost.
  - You are about to drop the column `seperator` on the `document_counter` table. All the data in the column will be lost.
  - You are about to drop the column `decimalAmount` on the `inventory_transaction` table. All the data in the column will be lost.
  - You are about to alter the column `cash_amount` on the `inventory_transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `credit_amount` on the `inventory_transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `transaction_amount` on the `inventory_transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `discount_amount` on the `inventory_transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `net_amount` on the `inventory_transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to drop the column `stock_id` on the `inventory_transaction_items` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `inventory_transaction_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `total` on the `inventory_transaction_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `price` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - A unique constraint covering the columns `[transaction_type]` on the table `document_counter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_id]` on the table `item_stocks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `separator` to the `document_counter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type` to the `document_counter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intAmount` to the `inventory_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type` to the `inventory_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account_transaction_items" ALTER COLUMN "credit" SET DATA TYPE INTEGER,
ALTER COLUMN "debit" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "coa" ALTER COLUMN "credit" SET DATA TYPE INTEGER,
ALTER COLUMN "debit" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "document_counter" DROP COLUMN "doc_type",
DROP COLUMN "seperator",
ADD COLUMN     "separator" TEXT NOT NULL,
ADD COLUMN     "transaction_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "inventory_transaction" DROP COLUMN "decimalAmount",
ADD COLUMN     "intAmount" INTEGER NOT NULL,
ADD COLUMN     "transaction_type" TEXT NOT NULL,
ALTER COLUMN "cash_amount" SET DATA TYPE INTEGER,
ALTER COLUMN "credit_amount" SET DATA TYPE INTEGER,
ALTER COLUMN "transaction_amount" SET DATA TYPE INTEGER,
ALTER COLUMN "discount_amount" SET DATA TYPE INTEGER,
ALTER COLUMN "net_amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "inventory_transaction_items" DROP COLUMN "stock_id",
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "total" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "document_counter_transaction_type_key" ON "document_counter"("transaction_type");

-- CreateIndex
CREATE UNIQUE INDEX "item_stocks_item_id_key" ON "item_stocks"("item_id");

-- AddForeignKey
ALTER TABLE "inventory_transaction_items" ADD CONSTRAINT "inventory_transaction_items_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "inventory_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_transaction_items" ADD CONSTRAINT "inventory_transaction_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
