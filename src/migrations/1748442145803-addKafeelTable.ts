import { MigrationInterface, QueryRunner } from "typeorm";

export class AddKafeelTable1748442145803 implements MigrationInterface {
    name = 'AddKafeelTable1748442145803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`kafeel\` (\`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD CONSTRAINT \`FK_eba20ef7c639f3d6ca7c2e450ce\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP FOREIGN KEY \`FK_eba20ef7c639f3d6ca7c2e450ce\``);
        await queryRunner.query(`DROP TABLE \`kafeel\``);
    }

}
