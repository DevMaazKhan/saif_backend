import { DocumentCounter, Prisma } from '@prisma/client';

export type DocumentCounterUniqueFindPayload =
  Prisma.DocumentCounterWhereUniqueInput;

export type GetNextDocumentCounterPayload = {
  transactionType: string;
};

export type CreateDocumentCounterPayload = Pick<
  DocumentCounter,
  | 'availableNo'
  | 'increment'
  | 'isLeftPadded'
  | 'length'
  | 'paddingCharacter'
  | 'postfix'
  | 'prefix'
  | 'separator'
  | 'start'
  | 'transactionType'
>;

export type UpdateDocumentCounterPayload = Pick<DocumentCounter, 'availableNo'>;
