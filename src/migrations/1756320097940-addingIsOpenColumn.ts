import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingIsOpenColumn1756320097940 implements MigrationInterface {
    name = 'AddingIsOpenColumn1756320097940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` ADD \`isOpen\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` DROP COLUMN \`isOpen\``);
    }

}
