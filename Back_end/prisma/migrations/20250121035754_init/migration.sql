/*
  Warnings:

  - Added the required column `chip_id` to the `Domba` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Domba` ADD COLUMN `chip_id` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
