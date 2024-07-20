import { Party, Prisma } from '@prisma/client';

export type PartyFindPayload = Prisma.PartyFindManyArgs;
export type PartyFindOnePayload = Prisma.PartyFindUniqueArgs;
export type PartyUniqueFindPayload = Prisma.PartyWhereUniqueInput;

export type CreatePartyPayload = Pick<
  Party,
  | 'nameFull'
  | 'nameShort'
  | 'phone1'
  | 'phone2'
  | 'phone3'
  | 'email1'
  | 'email2'
  | 'email3'
  | 'address'
  | 'areaID'
  | 'type'
>;
export type UpdatePartyPayload = Pick<
  Party,
  | 'nameFull'
  | 'nameShort'
  | 'phone1'
  | 'phone2'
  | 'phone3'
  | 'email1'
  | 'email2'
  | 'email3'
  | 'address'
  | 'areaID'
>;
