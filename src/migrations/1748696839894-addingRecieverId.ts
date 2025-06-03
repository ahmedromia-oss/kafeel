import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingRecieverId1748696839894 implements MigrationInterface {
    name = 'AddingRecieverId1748696839894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_4838cd4fc48a6ff2d4aa01aa646\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`senderId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`recieverId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_e07ec6a2e9267d02b004d0a9f23\` FOREIGN KEY (\`recieverId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_e07ec6a2e9267d02b004d0a9f23\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`recieverId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`senderId\``);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_4838cd4fc48a6ff2d4aa01aa646\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
