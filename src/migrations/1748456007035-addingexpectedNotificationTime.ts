import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingexpectedNotificationTime1748456007035 implements MigrationInterface {
    name = 'AddingexpectedNotificationTime1748456007035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD \`expectedNotificationTime\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP COLUMN \`expectedNotificationTime\``);
    }

}
