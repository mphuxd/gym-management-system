-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_memberId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "memberId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
