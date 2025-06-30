import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsAdminAndOtpProvider1751316379434 implements MigrationInterface {
    name = 'AddIsAdminAndOtpProvider1751316379434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`otp\` ADD \`Provider\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp\` DROP COLUMN \`Provider\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
    }

}
