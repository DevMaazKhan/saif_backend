/*
  Warnings:

  - You are about to drop the column `price` on the `item_stocks` table. All the data in the column will be lost.
  - Added the required column `purchase_price` to the `item_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_price` to the `item_stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_stocks" DROP COLUMN "price",
ADD COLUMN     "purchase_price" TEXT NOT NULL,
ADD COLUMN     "sale_price" TEXT NOT NULL;
