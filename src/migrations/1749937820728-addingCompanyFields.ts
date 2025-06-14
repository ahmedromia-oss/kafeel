import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingCompanyFields1749937820728 implements MigrationInterface {
    name = 'AddingCompanyFields1749937820728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`companyName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`officePhoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`officialEmail\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`websiteUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`officeCity\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`commercialRegistrationNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`officeOwnerName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`ownerName\` \`ownerName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`licenseNumber\` \`licenseNumber\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`officeName\` \`officeName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`ownerPhone\` \`ownerPhone\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`ownerEmail\` \`ownerEmail\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`city\` \`city\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`licenseImage\` \`licenseImage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`idImage\` \`idImage\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`idImage\` \`idImage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`licenseImage\` \`licenseImage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`city\` \`city\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`ownerEmail\` \`ownerEmail\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`ownerPhone\` \`ownerPhone\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`officeName\` \`officeName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`licenseNumber\` \`licenseNumber\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`ownerName\` \`ownerName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`officeOwnerName\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`commercialRegistrationNumber\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`officeCity\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`websiteUrl\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`officialEmail\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`officePhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`companyName\``);
    }

}
