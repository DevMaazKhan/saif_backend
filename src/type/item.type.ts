import { Item, Prisma } from '@prisma/client';

export type ItemFindPayload = Prisma.ItemFindManyArgs;
export type ItemUniqueFindPayload = Prisma.ItemWhereUniqueInput;

export type CreateItemPayload = Pick<
  Item,
  | 'nameFull'
  | 'nameShort'
  | 'purchasePrice'
  | 'salePrice'
  | 'unitsInCarton'
  | 'companyID'
>;
export type UpdateItemPayload = Pick<
  Item,
  | 'nameFull'
  | 'nameShort'
  | 'purchasePrice'
  | 'salePrice'
  | 'unitsInCarton'
  | 'companyID'
>;
