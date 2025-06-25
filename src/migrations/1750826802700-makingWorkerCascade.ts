import { MigrationInterface, QueryRunner } from "typeorm";

export class MakingWorkerCascade1750826802700 implements MigrationInterface {
    name = 'MakingWorkerCascade1750826802700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`worker\` DROP FOREIGN KEY \`FK_b4fc7927de11f45e2ecca71726b\``);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD CONSTRAINT \`FK_b4fc7927de11f45e2ecca71726b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`worker\` DROP FOREIGN KEY \`FK_b4fc7927de11f45e2ecca71726b\``);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD CONSTRAINT \`FK_b4fc7927de11f45e2ecca71726b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
