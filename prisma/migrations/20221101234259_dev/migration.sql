/*
  Warnings:

  - You are about to drop the column `planID` on the `MembershipPlan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[planId]` on the table `MembershipPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `planId` to the `MembershipPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MembershipPlan_planID_key";

-- AlterTable
ALTER TABLE "MembershipPlan" DROP COLUMN "planID",
ADD COLUMN     "planId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MembershipPlan_planId_key" ON "MembershipPlan"("planId");
