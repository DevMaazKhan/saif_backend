import { AccountTransaction, Prisma } from '@prisma/client';

export type AccountTransactionFindPayload =
  Prisma.AccountTransactionFindManyArgs;
export type AccountTransactionUniqueFindPayload =
  Prisma.AccountTransactionWhereUniqueInput;

export type CreateAccountTransactionPayload = Pick<
  AccountTransaction,
  | 'accountID'
  | 'acType'
  | 'partyID'
  | 'transactionID'
  | 'credit'
  | 'debit'
  | 'narration'
>;
