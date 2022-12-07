/*
  Warnings:

  - You are about to drop the column `contactId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `membershipId` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[memberId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_memberId_fkey";

-- DropIndex
DROP INDEX "Member_contactId_key";

-- DropIndex
DROP INDEX "Member_membershipId_key";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "memberId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "contactId",
DROP COLUMN "membershipId";

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "memberId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Contact_memberId_key" ON "Contact"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_memberId_key" ON "Membership"("memberId");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
