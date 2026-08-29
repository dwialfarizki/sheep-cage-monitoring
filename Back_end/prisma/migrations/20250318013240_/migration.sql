/*
  Warnings:

  - You are about to drop the column `chip_id` on the `domba` table. All the data in the column will be lost.
  - You are about to drop the column `acc_x` on the `mpu` table. All the data in the column will be lost.
  - You are about to drop the column `acc_y` on the `mpu` table. All the data in the column will be lost.
  - You are about to drop the column `acc_z` on the `mpu` table. All the data in the column will be lost.
  - You are about to drop the column `kondisi` on the `mpu` table. All the data in the column will be lost.
  - You are about to drop the column `tinggi` on the `mpu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `domba` DROP COLUMN `chip_id`,
    ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `mpu` DROP COLUMN `acc_x`,
    DROP COLUMN `acc_y`,
    DROP COLUMN `acc_z`,
    DROP COLUMN `kondisi`,
    DROP COLUMN `tinggi`,
    ADD COLUMN `classification` INTEGER NULL,
    ADD COLUMN `mean_x` DECIMAL(10, 2) NULL,
    ADD COLUMN `mean_y` DECIMAL(10, 2) NULL,
    ADD COLUMN `mean_z` DECIMAL(10, 2) NULL;
