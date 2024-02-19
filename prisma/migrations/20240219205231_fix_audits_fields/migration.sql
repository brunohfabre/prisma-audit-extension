/*
  Warnings:

  - You are about to drop the column `args` on the `audits` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `audits` table. All the data in the column will be lost.
  - Added the required column `data` to the `audits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `audits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audits" DROP COLUMN "args",
DROP COLUMN "result",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "audits" ADD CONSTRAINT "audits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
