-- AlterTable
ALTER TABLE `order` MODIFY `stripePaymentId` VARCHAR(191) NULL,
    MODIFY `amount` INTEGER NULL,
    MODIFY `status` VARCHAR(191) NULL,
    MODIFY `currentcy` VARCHAR(191) NULL;
