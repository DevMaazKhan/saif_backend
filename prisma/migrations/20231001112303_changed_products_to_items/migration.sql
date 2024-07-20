/*
  Warnings:

  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item_stocks" DROP CONSTRAINT "item_stocks_item_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_company_id_fkey";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "name_full" TEXT NOT NULL,
    "name_short" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_stocks" ADD CONSTRAINT "item_stocks_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
