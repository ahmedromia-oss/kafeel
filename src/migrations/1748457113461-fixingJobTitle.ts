import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingJobTitle1748457113461 implements MigrationInterface {
    name = 'FixingJobTitle1748457113461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience\` CHANGE \`jobTite\` \`jobTitle\` varchar(50) NOT NULL DEFAULT 'N/A'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience\` CHANGE \`jobTitle\` \`jobTite\` varchar(50) NOT NULL DEFAULT 'N/A'`);
    }

}
