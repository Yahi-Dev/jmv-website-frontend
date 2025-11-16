/*
  Warnings:

  - You are about to drop the column `linkedin` on the `miembros_consejo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `miembros_consejo` DROP COLUMN `linkedin`,
    ADD COLUMN `estado` ENUM('Titular', 'Suplente') NOT NULL DEFAULT 'Titular';
