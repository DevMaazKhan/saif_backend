/*
  Warnings:

  - You are about to drop the column `balance_quantity` on the `item_stocks` table. All the data in the column will be lost.
  - You are about to drop the column `received_quantity` on the `item_stocks` table. All the data in the column will be lost.
  - Added the required column `balance_bonus_quantity` to the `item_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance_com_quantity` to the `item_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `received_bonus_quantity` to the `item_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `received_com_quantity` to the `item_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units_in_carton` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area_id` to the `parties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_stocks" DROP COLUMN "balance_quantity",
DROP COLUMN "received_quantity",
ADD COLUMN     "balance_bonus_quantity" INTEGER NOT NULL,
ADD COLUMN     "balance_com_quantity" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "received_bonus_quantity" INTEGER NOT NULL,
ADD COLUMN     "received_com_quantity" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "units_in_carton" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "lookup" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "parties" ADD COLUMN     "address" TEXT,
ADD COLUMN     "area_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "areas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction" (
    "id" TEXT NOT NULL,
    "transaction_no" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "party_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,
    "salesman_id" TEXT NOT NULL,
    "promo_id" TEXT NOT NULL,
    "cash_amount" DECIMAL(65,30) NOT NULL,
    "credit_amount" DECIMAL(65,30) NOT NULL,
    "decimalAmount" DECIMAL(65,30) NOT NULL,
    "transaction_amount" DECIMAL(65,30) NOT NULL,
    "discount_amount" DECIMAL(65,30) NOT NULL,
    "net_amount" DECIMAL(65,30) NOT NULL,
    "narration" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction_items" (
    "id" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "com_qty" INTEGER NOT NULL,
    "bonus_qty" INTEGER NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "stock_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_transaction_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_transaction" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "party_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_transaction_items" (
    "id" TEXT NOT NULL,
    "credit" DECIMAL(65,30) NOT NULL,
    "debit" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_transaction_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coa" (
    "id" TEXT NOT NULL,
    "acName" TEXT NOT NULL,
    "ac_type" TEXT NOT NULL,
    "credit" DECIMAL(65,30) NOT NULL,
    "debit" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
