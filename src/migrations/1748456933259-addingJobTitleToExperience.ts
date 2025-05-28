import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingJobTitleToExperience1748456933259 implements MigrationInterface {
    name = 'AddingJobTitleToExperience1748456933259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience\` ADD \`jobTite\` varchar(50) NOT NULL DEFAULT 'N/A'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience\` DROP COLUMN \`jobTite\``);
    }

}
