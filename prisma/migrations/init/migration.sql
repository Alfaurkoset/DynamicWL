-- CreateTable
CREATE TABLE `Minecraft IGNs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `LatestName` VARCHAR(45) NOT NULL,
    `PlayerUUID` LONGTEXT NOT NULL,
    `AddedTime` DATETIME(0) NOT NULL,
    `LatestUpdate` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

