/*
  Warnings:

  - The primary key for the `salesman_customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `salesman_customers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "salesman_customers_salesman_id_customer_id_key";

-- AlterTable
ALTER TABLE "salesman_customers" DROP CONSTRAINT "salesman_customers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "salesman_customers_pkey" PRIMARY KEY ("salesman_id", "customer_id");
