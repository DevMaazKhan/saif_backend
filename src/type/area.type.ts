import { Area, Prisma } from '@prisma/client';

export type AreaFindPayload = Prisma.AreaFindManyArgs;
export type AreaFindOnePayload = Prisma.AreaFindUniqueArgs;
export type AreaUniqueFindPayload = Prisma.AreaWhereUniqueInput;

export type CreateAreaPayload = Pick<Area, 'name'>;
export type UpdateAreaPayload = Pick<Area, 'name'>;
