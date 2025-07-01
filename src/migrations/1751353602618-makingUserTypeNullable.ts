import { MigrationInterface, QueryRunner } from "typeorm";

export class MakingUserTypeNullable1751353602618 implements MigrationInterface {
    name = 'MakingUserTypeNullable1751353602618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`userType\` \`userType\` enum ('WORKER', 'KAFEEL', 'COMPANY', 'ADMIN') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`userType\` \`userType\` enum ('WORKER', 'KAFEEL', 'COMPANY', 'ADMIN') NOT NULL DEFAULT 'WORKER'`);
    }

}
