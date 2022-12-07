/*
  Warnings:

  - The `membershipEnds` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "membershipEnds",
ADD COLUMN     "membershipEnds" TIMESTAMP(3);
