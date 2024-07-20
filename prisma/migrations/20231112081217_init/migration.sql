/*
  Warnings:

  - You are about to drop the column `purchase_price` on the `inventory_transaction_items` table. All the data in the column will be lost.
  - You are about to drop the column `sale_price` on the `inventory_transaction_items` table. All the data in the column will be lost.
  - Added the required column `price` to the `inventory_transaction_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory_transaction_items" DROP COLUMN "purchase_price",
DROP COLUMN "sale_price",
ADD COLUMN     "price" INTEGER NOT NULL;
