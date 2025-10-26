-- CreateTable
CREATE TABLE `Testimonio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `mensaje` VARCHAR(191) NULL,
    `reputacion` INTEGER NULL,
    `iglesia` VARCHAR(191) NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` VARCHAR(191) NULL,
    `createdByIp` VARCHAR(191) NULL,
    `modifiedDate` DATETIME(3) NULL,
    `modifiedById` VARCHAR(191) NULL,
    `modifiedByIp` VARCHAR(191) NULL,
    `deletedDate` DATETIME(3) NULL,
    `deletedById` VARCHAR(191) NULL,
    `deletedByIp` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
