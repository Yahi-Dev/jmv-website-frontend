-- CreateTable
CREATE TABLE `Formacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ruta_video` VARCHAR(191) NULL,
    `titulo` VARCHAR(191) NULL,
    `detalles` VARCHAR(191) NULL,
    `modulo` ENUM('Voluntario', 'Catequesis', 'Oraciones', 'Podcast', 'Mision', 'Guia') NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` VARCHAR(191) NULL,
    `modifiedDate` DATETIME(3) NULL,
    `modifiedById` VARCHAR(191) NULL,
    `deletedDate` DATETIME(3) NULL,
    `deletedById` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
