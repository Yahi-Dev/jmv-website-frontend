/*
  Warnings:

  - You are about to drop the column `detalles` on the `formacion` table. All the data in the column will be lost.
  - You are about to drop the column `ruta_video` on the `formacion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `formacion` DROP COLUMN `detalles`,
    DROP COLUMN `ruta_video`,
    ADD COLUMN `descripcion` VARCHAR(191) NULL,
    ADD COLUMN `enlace` VARCHAR(191) NULL,
    ADD COLUMN `ruta` VARCHAR(191) NULL;
