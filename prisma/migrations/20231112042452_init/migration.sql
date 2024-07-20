/*
  Warnings:

  - You are about to drop the column `price` on the `inventory_transaction_items` table. All the data in the column will be lost.
  - Added the required column `purchase_price` to the `inventory_transaction_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_price` to the `inventory_transaction_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory_transaction_items" DROP COLUMN "price",
ADD COLUMN     "purchase_price" INTEGER NOT NULL,
ADD COLUMN     "sale_price" INTEGER NOT NULL;
