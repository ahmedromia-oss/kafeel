import { MigrationInterface, QueryRunner } from "typeorm";

export class Addingkafeelid1756119133652 implements MigrationInterface {
    name = 'Addingkafeelid1756119133652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_e66170573cabd565dab1132727d\``);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`companyId\` \`companyId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_e66170573cabd565dab1132727d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_1fdec005e8e51778a79f91e86a1\` FOREIGN KEY (\`KafeelId\`) REFERENCES \`kafeel\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_1fdec005e8e51778a79f91e86a1\``);
        await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_e66170573cabd565dab1132727d\``);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`companyId\` \`companyId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_e66170573cabd565dab1132727d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
