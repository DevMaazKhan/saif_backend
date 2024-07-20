-- AlterTable
ALTER TABLE "document_counter" ALTER COLUMN "is_left_padded" DROP NOT NULL,
ALTER COLUMN "padding_character" DROP NOT NULL,
ALTER COLUMN "length" DROP NOT NULL,
ALTER COLUMN "prefix" DROP NOT NULL,
ALTER COLUMN "postfix" DROP NOT NULL,
ALTER COLUMN "separator" DROP NOT NULL;
