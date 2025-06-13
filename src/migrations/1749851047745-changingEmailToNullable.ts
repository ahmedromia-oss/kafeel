import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingEmailToNullable1749851047745 implements MigrationInterface {
    name = 'ChangingEmailToNullable1749851047745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`otp\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`expiresAt\` timestamp NOT NULL, \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_f2578043e491921209f5dadd08\` (\`phoneNumber\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`nationalId\` \`nationalId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp\` ADD CONSTRAINT \`FK_db724db1bc3d94ad5ba38518433\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp\` DROP FOREIGN KEY \`FK_db724db1bc3d94ad5ba38518433\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`nationalId\` \`nationalId\` varchar(255) NOT NULL DEFAULT '30128489520460'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_f2578043e491921209f5dadd08\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`otp\``);
    }

}
