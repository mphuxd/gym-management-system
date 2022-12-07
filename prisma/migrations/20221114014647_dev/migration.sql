/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_user_id_key" ON "Member"("user_id");
