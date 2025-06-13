import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingEmailToNullable1749844652483 implements MigrationInterface {
    name = 'ChangingEmailToNullable1749844652483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`nationalId\` \`nationalId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`nationalId\` \`nationalId\` varchar(255) NOT NULL DEFAULT '30128489520460'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
    }

}
