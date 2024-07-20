-- AddForeignKey
ALTER TABLE "inventory_transaction" ADD CONSTRAINT "inventory_transaction_salesman_id_fkey" FOREIGN KEY ("salesman_id") REFERENCES "parties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
