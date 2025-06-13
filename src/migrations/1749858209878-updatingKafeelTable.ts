import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingKafeelTable1749858209878 implements MigrationInterface {
    name = 'UpdatingKafeelTable1749858209878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD \`userName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD \`JobTitle\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD \`city\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD \`preferred\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP COLUMN \`preferred\``);
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP COLUMN \`JobTitle\``);
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP COLUMN \`userName\``);
    }

}
