import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovingCompanyId1751318417763 implements MigrationInterface {
    name = 'RemovingCompanyId1751318417763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_applicants\` DROP COLUMN \`companyId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_applicants\` ADD \`companyId\` varchar(255) NOT NULL`);
    }

}
