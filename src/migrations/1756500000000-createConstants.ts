import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConstants1756500000000 implements MigrationInterface {
    name = 'CreateConstants1756500000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`constants\` (
            \`id\` varchar(255) NOT NULL DEFAULT 'constants', 
            \`aboutEn\` text NOT NULL, 
            \`aboutAr\` text NOT NULL, 
            \`aboutBn\` text NOT NULL, 
            \`aboutHi\` text NOT NULL, 
            \`aboutUr\` text NOT NULL, 
            \`privacyPolicyEn\` text NOT NULL, 
            \`privacyPolicyAr\` text NOT NULL, 
            \`privacyPolicyBn\` text NOT NULL, 
            \`privacyPolicyHi\` text NOT NULL, 
            \`privacyPolicyUr\` text NOT NULL, 
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`constants\``);
    }
}

