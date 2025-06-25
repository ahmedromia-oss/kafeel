import { MigrationInterface, QueryRunner } from "typeorm";

export class MakingAllCascade1750825805004 implements MigrationInterface {
    name = 'MakingAllCascade1750825805004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP FOREIGN KEY \`FK_eba20ef7c639f3d6ca7c2e450ce\``);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` DROP FOREIGN KEY \`FK_4b9d9488cc949c7e00e2cb44ad7\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP COLUMN \`currencey\``);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD CONSTRAINT \`FK_eba20ef7c639f3d6ca7c2e450ce\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` ADD CONSTRAINT \`FK_4b9d9488cc949c7e00e2cb44ad7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` DROP FOREIGN KEY \`FK_4b9d9488cc949c7e00e2cb44ad7\``);
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP FOREIGN KEY \`FK_eba20ef7c639f3d6ca7c2e450ce\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD \`currencey\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` ADD CONSTRAINT \`FK_4b9d9488cc949c7e00e2cb44ad7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD CONSTRAINT \`FK_eba20ef7c639f3d6ca7c2e450ce\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
