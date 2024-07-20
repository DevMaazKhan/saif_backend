import { ItemStock, Prisma } from '@prisma/client';

export type ItemStockFindPayload = Prisma.ItemStockFindManyArgs;
export type ItemStockFindOnePayload = Prisma.ItemStockFindUniqueArgs;
export type ItemStockUniqueFindPayload = Prisma.ItemStockWhereUniqueInput;

export type CreateItemStockPayload = Pick<
  ItemStock,
  | 'itemID'
  | 'balanceBonusQty'
  | 'balanceComQty'
  | 'purchasePrice'
  | 'salePrice'
  | 'receivedBonusQty'
  | 'receivedComQty'
  | 'transactionDate'
  | 'transactionNumber'
>;
export type UpdateItemStockPayload = Pick<
  ItemStock,
  | 'balanceBonusQty'
  | 'balanceComQty'
  | 'itemID'
  | 'transactionDate'
  | 'transactionNumber'
  | 'purchasePrice'
  | 'salePrice'
>;
