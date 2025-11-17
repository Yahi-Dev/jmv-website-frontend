/*
  Warnings:

  - You are about to drop the column `actaUrl` on the `consejos_nacionales` table. All the data in the column will be lost.
  - You are about to drop the column `sede` on the `consejos_nacionales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `consejos_nacionales` DROP COLUMN `actaUrl`,
    DROP COLUMN `sede`;
