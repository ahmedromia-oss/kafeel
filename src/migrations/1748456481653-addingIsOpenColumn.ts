import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingIsOpenColumn1748456481653 implements MigrationInterface {
    name = 'AddingIsOpenColumn1748456481653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD \`IsOpen\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP COLUMN \`IsOpen\``);
    }

}
