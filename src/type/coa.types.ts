import { COA, Prisma } from '@prisma/client';

export type COAFindPayload = Prisma.COAFindManyArgs;
export type COAFindOnePayload = Prisma.COAFindUniqueArgs;
export type COAUniqueFindPayload = Prisma.COAWhereUniqueInput;
export type CreateCOAPayload = Pick<COA, 'acName' | 'acType'>;
export type UpdateCOAPayload = Pick<COA, 'acName'>;
