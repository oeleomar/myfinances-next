-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recurrence" INTEGER,
ADD COLUMN     "startDate" TIMESTAMP(3);
