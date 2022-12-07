/*
  Warnings:

  - You are about to drop the column `memberId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `Membership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[membershipId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_memberId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_memberId_fkey";

-- DropIndex
DROP INDEX "Contact_memberId_key";

-- DropIndex
DROP INDEX "Membership_memberId_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "memberId";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "contactId" TEXT NOT NULL,
ADD COLUMN     "membershipId" TEXT;

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "memberId";

-- CreateIndex
CREATE UNIQUE INDEX "Member_membershipId_key" ON "Member"("membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_contactId_key" ON "Member"("contactId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
