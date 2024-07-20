-- AddForeignKey
ALTER TABLE "account_transaction" ADD CONSTRAINT "account_transaction_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
