-- DropForeignKey
ALTER TABLE "parties" DROP CONSTRAINT "parties_area_id_fkey";

-- AlterTable
ALTER TABLE "parties" ALTER COLUMN "area_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
