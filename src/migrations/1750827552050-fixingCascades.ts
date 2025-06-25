import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingCascades1750827552050 implements MigrationInterface {
    name = 'FixingCascades1750827552050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_c41a1d36702f2cd0403ce58d33a\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP FOREIGN KEY \`FK_7533d54ef11a0e751ea5b37d91b\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP FOREIGN KEY \`FK_9909c34914693bae2e492e535a2\``);
        await queryRunner.query(`ALTER TABLE \`award\` DROP FOREIGN KEY \`FK_e429f39b970f0af2238dec28267\``);
        await queryRunner.query(`ALTER TABLE \`education\` DROP FOREIGN KEY \`FK_f3f57b58b18078c6e4be04f613e\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_57509f1c18d287c0a1be4a29182\``);
        await queryRunner.query(`ALTER TABLE \`language\` DROP FOREIGN KEY \`FK_cd270e0685c7ac344149ce0140f\``);
        await queryRunner.query(`ALTER TABLE \`skill\` DROP FOREIGN KEY \`FK_aae20eafb2b4a5805bf4eb3d3d6\``);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` DROP FOREIGN KEY \`FK_4b9d9488cc949c7e00e2cb44ad7\``);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_c41a1d36702f2cd0403ce58d33a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD CONSTRAINT \`FK_7533d54ef11a0e751ea5b37d91b\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD CONSTRAINT \`FK_9909c34914693bae2e492e535a2\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`award\` ADD CONSTRAINT \`FK_e429f39b970f0af2238dec28267\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`education\` ADD CONSTRAINT \`FK_f3f57b58b18078c6e4be04f613e\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_57509f1c18d287c0a1be4a29182\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`language\` ADD CONSTRAINT \`FK_cd270e0685c7ac344149ce0140f\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD CONSTRAINT \`FK_aae20eafb2b4a5805bf4eb3d3d6\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` ADD CONSTRAINT \`FK_4b9d9488cc949c7e00e2cb44ad7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` DROP FOREIGN KEY \`FK_4b9d9488cc949c7e00e2cb44ad7\``);
        await queryRunner.query(`ALTER TABLE \`skill\` DROP FOREIGN KEY \`FK_aae20eafb2b4a5805bf4eb3d3d6\``);
        await queryRunner.query(`ALTER TABLE \`language\` DROP FOREIGN KEY \`FK_cd270e0685c7ac344149ce0140f\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_57509f1c18d287c0a1be4a29182\``);
        await queryRunner.query(`ALTER TABLE \`education\` DROP FOREIGN KEY \`FK_f3f57b58b18078c6e4be04f613e\``);
        await queryRunner.query(`ALTER TABLE \`award\` DROP FOREIGN KEY \`FK_e429f39b970f0af2238dec28267\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP FOREIGN KEY \`FK_9909c34914693bae2e492e535a2\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP FOREIGN KEY \`FK_7533d54ef11a0e751ea5b37d91b\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_c41a1d36702f2cd0403ce58d33a\``);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` ADD CONSTRAINT \`FK_4b9d9488cc949c7e00e2cb44ad7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD CONSTRAINT \`FK_aae20eafb2b4a5805bf4eb3d3d6\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`language\` ADD CONSTRAINT \`FK_cd270e0685c7ac344149ce0140f\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_57509f1c18d287c0a1be4a29182\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`education\` ADD CONSTRAINT \`FK_f3f57b58b18078c6e4be04f613e\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`award\` ADD CONSTRAINT \`FK_e429f39b970f0af2238dec28267\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD CONSTRAINT \`FK_9909c34914693bae2e492e535a2\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD CONSTRAINT \`FK_7533d54ef11a0e751ea5b37d91b\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_c41a1d36702f2cd0403ce58d33a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
