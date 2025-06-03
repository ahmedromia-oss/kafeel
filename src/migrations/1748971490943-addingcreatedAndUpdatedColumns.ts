import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingcreatedAndUpdatedColumns1748971490943 implements MigrationInterface {
    name = 'AddingcreatedAndUpdatedColumns1748971490943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_applicants\` DROP COLUMN \`appliedAt\``);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`language\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`language\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD \`jobTitle\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`worker\` DROP COLUMN \`jobTitle\``);
        await queryRunner.query(`ALTER TABLE \`worker\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`worker\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`skill\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`skill\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`language\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`language\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` ADD \`appliedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
