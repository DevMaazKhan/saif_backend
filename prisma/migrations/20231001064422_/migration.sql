/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name_full" TEXT NOT NULL,
    "name_short" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL,
    "name_full" TEXT NOT NULL,
    "name_short" TEXT NOT NULL,
    "email_1" TEXT,
    "email_2" TEXT,
    "email_3" TEXT,
    "phone_1" TEXT,
    "phone_2" TEXT,
    "phone_3" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_stocks" (
    "id" TEXT NOT NULL,
    "batch_number" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "manufacture_date" TIMESTAMP(3) NOT NULL,
    "transaction_number" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "balance_quantity" INTEGER NOT NULL,
    "received_quantity" INTEGER NOT NULL,
    "item_id" TEXT NOT NULL,

    CONSTRAINT "item_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lookup" (
    "id" TEXT NOT NULL,
    "lookup_type" TEXT NOT NULL,
    "lookup_type_id" TEXT NOT NULL,
    "lookup_order" TEXT NOT NULL,
    "lookup_description" TEXT NOT NULL,
    "lookup_value_full" TEXT NOT NULL,
    "lookup_value_short" TEXT NOT NULL,

    CONSTRAINT "lookup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_stocks" ADD CONSTRAINT "item_stocks_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
