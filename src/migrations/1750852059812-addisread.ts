import { MigrationInterface, QueryRunner } from "typeorm";

export class Addisread1750852059812 implements MigrationInterface {
    name = 'Addisread1750852059812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`isRead\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`isRead\``);
    }

}
