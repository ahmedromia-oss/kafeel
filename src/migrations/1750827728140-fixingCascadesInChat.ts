import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingCascadesInChat1750827728140 implements MigrationInterface {
    name = 'FixingCascadesInChat1750827728140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` DROP FOREIGN KEY \`FK_4b9d9488cc949c7e00e2cb44ad7\``);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` ADD CONSTRAINT \`FK_4b9d9488cc949c7e00e2cb44ad7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` DROP FOREIGN KEY \`FK_4b9d9488cc949c7e00e2cb44ad7\``);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` ADD CONSTRAINT \`FK_4b9d9488cc949c7e00e2cb44ad7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
