import {
  InventoryTransaction,
  InventoryTransactionItem,
  Prisma,
} from '@prisma/client';

export type InventoryTransactionFindPayload =
  Prisma.InventoryTransactionFindManyArgs;
export type InventoryTransactionUniqueFindPayload =
  Prisma.InventoryTransactionWhereUniqueInput;

export type CreateInventoryTransactionPayload = Pick<
  InventoryTransaction,
  | 'transactionNo'
  | 'transactionDate'
  | 'transactionType'
  | 'areaID'
  | 'balanceAmount'
  | 'cashAmount'
  | 'creditAmount'
  | 'discountAmount'
  | 'narration'
  | 'netAmount'
  | 'partyID'
  | 'promoID'
  | 'salesmanID'
  | 'transactionAmount'
> & {
  inventoryTransactionItems: Pick<
    InventoryTransactionItem,
    'itemID' | 'price' | 'total' | 'comQty' | 'bonusQty'
  >[];
};
export type UpdateInventoryTransactionPayload = Pick<
  InventoryTransaction,
  'balanceAmount' | 'cashAmount' | 'creditAmount' | 'narration' | 'netAmount'
>;
