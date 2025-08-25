import { MigrationInterface, QueryRunner } from "typeorm";

export class Addingkafeelid1756107832597 implements MigrationInterface {
    name = 'Addingkafeelid1756107832597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` DROP COLUMN \`KafeelId\``);
        await queryRunner.query(`ALTER TABLE \`job\` ADD \`kafeelId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_e66170573cabd565dab1132727d\``);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`companyId\` \`companyId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_e66170573cabd565dab1132727d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_b086675cad4bd0e8908af20379a\` FOREIGN KEY (\`kafeelId\`) REFERENCES \`kafeel\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_b086675cad4bd0e8908af20379a\``);
        await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_e66170573cabd565dab1132727d\``);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`companyId\` \`companyId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_e66170573cabd565dab1132727d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job\` DROP COLUMN \`kafeelId\``);
        await queryRunner.query(`ALTER TABLE \`job\` ADD \`KafeelId\` varchar(255) NULL`);
    }

}
