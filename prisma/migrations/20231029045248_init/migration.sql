/*
  Warnings:

  - You are about to drop the column `price` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[salesman_id]` on the table `salesman_customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customer_id]` on the table `salesman_customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[salesman_id,customer_id]` on the table `salesman_customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `purchase_price` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_price` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "price",
ADD COLUMN     "purchase_price" INTEGER NOT NULL,
ADD COLUMN     "sale_price" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "salesman_customers_salesman_id_key" ON "salesman_customers"("salesman_id");

-- CreateIndex
CREATE UNIQUE INDEX "salesman_customers_customer_id_key" ON "salesman_customers"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "salesman_customers_salesman_id_customer_id_key" ON "salesman_customers"("salesman_id", "customer_id");
