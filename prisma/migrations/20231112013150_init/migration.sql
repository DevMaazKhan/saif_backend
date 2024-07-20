-- AddForeignKey
ALTER TABLE "account_transaction" ADD CONSTRAINT "account_transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "coa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
