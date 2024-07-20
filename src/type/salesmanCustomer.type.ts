import { Prisma, SalesmanCustomer } from '@prisma/client';

export type SalesmanCustomerFindPayload = Prisma.SalesmanCustomerFindManyArgs;
export type SalesmanCustomerUniqueFindPayload =
  Prisma.SalesmanCustomerWhereUniqueInput;

export type CreateSalesmanCustomerPayload = Pick<
  SalesmanCustomer,
  'customerID' | 'salesmanID'
>;
export type UpdateSalesmanCustomerPayload = Pick<
  SalesmanCustomer,
  'salesmanID'
>;
