-- CreateTable
CREATE TABLE `consejos_nacionales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `periodo` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NULL,
    `sede` VARCHAR(191) NULL,
    `lema` VARCHAR(191) NULL,
    `actaUrl` VARCHAR(191) NULL,
    `fotoUrl` VARCHAR(191) NULL,
    `isActual` BOOLEAN NOT NULL DEFAULT false,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` VARCHAR(191) NULL,
    `modifiedDate` DATETIME(3) NULL,
    `modifiedById` VARCHAR(191) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedDate` DATETIME(3) NULL,
    `deletedById` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `miembros_consejo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consejoId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `cargo` ENUM('CoordinaraNacional', 'SecretariaNacional', 'VocalDePrejuveniles', 'TesoreraNacional', 'VocalDeLiturgiaYmariana', 'VocalDeFormacion', 'VocalDeExpansion', 'VocalDeComunicacionYEnlaceNacional', 'AsesoraNacional', 'VocalDeMisionYCaridad') NOT NULL,
    `ciudad` VARCHAR(191) NULL,
    `fotoUrl` VARCHAR(191) NULL,
    `bioCorta` VARCHAR(191) NULL,
    `bioExtendida` TEXT NULL,
    `telefono` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `trayectoria` JSON NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` VARCHAR(191) NULL,
    `modifiedDate` DATETIME(3) NULL,
    `modifiedById` VARCHAR(191) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedDate` DATETIME(3) NULL,
    `deletedById` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `miembros_consejo` ADD CONSTRAINT `miembros_consejo_consejoId_fkey` FOREIGN KEY (`consejoId`) REFERENCES `consejos_nacionales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `miembros_consejo` ADD CONSTRAINT `miembros_consejo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
