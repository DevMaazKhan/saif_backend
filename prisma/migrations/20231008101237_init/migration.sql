/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `item_stocks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item_stocks" DROP COLUMN "transaction_id";

-- CreateTable
CREATE TABLE "salesman_customers" (
    "id" TEXT NOT NULL,
    "salesman_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "salesman_customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_counter" (
    "id" TEXT NOT NULL,
    "doc_type" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "increment" INTEGER NOT NULL,
    "available_no" INTEGER NOT NULL,
    "is_left_padded" BOOLEAN NOT NULL,
    "padding_character" TEXT NOT NULL,
    "seperator" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "prefix" TEXT NOT NULL,
    "postfix" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_counter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "salesman_customers" ADD CONSTRAINT "salesman_customers_salesman_id_fkey" FOREIGN KEY ("salesman_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesman_customers" ADD CONSTRAINT "salesman_customers_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
