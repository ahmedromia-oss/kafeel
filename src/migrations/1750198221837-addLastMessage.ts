import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastMessage1750198221837 implements MigrationInterface {
    name = 'AddLastMessage1750198221837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats\` ADD \`lastMessageId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD UNIQUE INDEX \`IDX_5768a56bdd855c5b78ce66c9a3\` (\`lastMessageId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5768a56bdd855c5b78ce66c9a3\` ON \`chats\` (\`lastMessageId\`)`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_5768a56bdd855c5b78ce66c9a37\` FOREIGN KEY (\`lastMessageId\`) REFERENCES \`messages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_5768a56bdd855c5b78ce66c9a37\``);
        await queryRunner.query(`DROP INDEX \`REL_5768a56bdd855c5b78ce66c9a3\` ON \`chats\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP INDEX \`IDX_5768a56bdd855c5b78ce66c9a3\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP COLUMN \`lastMessageId\``);
    }

}
