import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovingIsAdmin1751353770467 implements MigrationInterface {
    name = 'RemovingIsAdmin1751353770467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT '0'`);
    }

}
