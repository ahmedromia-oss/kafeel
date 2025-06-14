import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1749934544305 implements MigrationInterface {
    name = 'FirstMigration1749934544305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachments\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`messageId\` varchar(255) NOT NULL, \`filename\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`chatId\` varchar(255) NOT NULL, \`senderId\` varchar(255) NULL, \`recieverId\` varchar(255) NULL, \`content\` text NOT NULL, \`messageType\` enum ('TEXT', 'IMAGE', 'FILE') NOT NULL DEFAULT 'TEXT', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chats\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`profilePhoto\` varchar(255) NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`phoneVerified\` tinyint NOT NULL DEFAULT 0, \`phoneNumber\` varchar(255) NOT NULL, \`country\` varchar(255) NULL, \`birthDate\` datetime NULL, \`nationalId\` varchar(255) NULL, \`userType\` enum ('WORKER', 'KAFEEL', 'COMPANY') NOT NULL DEFAULT 'WORKER', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_f2578043e491921209f5dadd08\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`advertise\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`jobTitle\` varchar(100) NOT NULL, \`currentCity\` varchar(50) NOT NULL, \`IsOpen\` tinyint NOT NULL DEFAULT 1, \`preferredSponsorType\` enum ('COMPANY', 'INDIVIDUAL', 'GOVERNMENT') NOT NULL, \`expectedNotificationTime\` varchar(50) NULL, \`workType\` enum ('FULL_TIME', 'PART_TIME', 'TEMPORARY', 'INTERNSHIP') NOT NULL, \`description\` text NULL, \`workerId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`award\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`link\` varchar(255) NULL, \`institution\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`startDate\` date NULL, \`startYearOnly\` tinyint NOT NULL DEFAULT 0, \`endDate\` date NULL, \`endYearOnly\` tinyint NOT NULL DEFAULT 0, \`workerId\` varchar(255) NOT NULL, \`certificateFileUrl\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`education\` (\`id\` varchar(255) NOT NULL, \`startDate\` date NOT NULL, \`degree\` enum ('ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTORATE', 'DIPLOMA') NOT NULL, \`workerId\` varchar(255) NOT NULL, \`describtion\` varchar(255) NULL, \`endDate\` date NULL, \`uniOrSchool\` varchar(255) NOT NULL, \`uniOrSchoolUrl\` varchar(255) NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experience\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`jobTitle\` varchar(50) NOT NULL DEFAULT 'N/A', \`startDate\` date NOT NULL, \`workerId\` varchar(255) NOT NULL, \`describtion\` varchar(255) NULL, \`endDate\` date NULL, \`company\` varchar(255) NOT NULL, \`companyUrl\` varchar(255) NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`language\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`lanuageLevel\` enum ('BEGINNER', 'INTERMEDITE', 'NATIVE') NOT NULL, \`describtion\` varchar(255) NULL, \`workerId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NOT NULL, \`aboutMe\` text NULL, \`ownerName\` varchar(255) NOT NULL, \`licenseNumber\` varchar(100) NOT NULL, \`officeName\` varchar(255) NOT NULL, \`ownerPhone\` varchar(20) NOT NULL, \`ownerEmail\` varchar(255) NOT NULL, \`city\` varchar(100) NOT NULL, \`licenseImage\` varchar(255) NOT NULL, \`idImage\` varchar(255) NOT NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`salary\` decimal(10,2) NOT NULL, \`location\` varchar(255) NULL, \`jobType\` enum ('FULL_TIME', 'PART_TIME', 'TEMPORARY', 'INTERNSHIP') NOT NULL, \`isRemote\` tinyint NOT NULL DEFAULT 0, \`companyId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_applicants\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`workerId\` varchar(255) NOT NULL, \`JobId\` varchar(255) NOT NULL, \`CV\` varchar(255) NOT NULL, \`describtion\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_aa8996dccf9f610c3541a4119b\` (\`workerId\`, \`JobId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skill\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`skillLevel\` enum ('BEGINNER', 'INTERMEDITE', 'PROFISSIONAL') NOT NULL, \`describtion\` varchar(255) NULL, \`workerId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`worker\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NOT NULL, \`jobTitle\` text NULL, \`aboutMe\` text NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`otp\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`expiresAt\` timestamp NOT NULL, \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`kafeel\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NOT NULL, \`userName\` varchar(255) NULL, \`JobTitle\` varchar(255) NULL, \`city\` varchar(255) NULL, \`preferred\` varchar(255) NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chats_members_user\` (\`chatsId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, INDEX \`IDX_551c7b45ce250ac2e47f96cef7\` (\`chatsId\`), INDEX \`IDX_4b9d9488cc949c7e00e2cb44ad\` (\`userId\`), PRIMARY KEY (\`chatsId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD CONSTRAINT \`FK_d25de32d1398e398a082f4f5d2a\` FOREIGN KEY (\`messageId\`) REFERENCES \`messages\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_36bc604c820bb9adc4c75cd4115\` FOREIGN KEY (\`chatId\`) REFERENCES \`chats\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_2db9cf2b3ca111742793f6c37ce\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_e07ec6a2e9267d02b004d0a9f23\` FOREIGN KEY (\`recieverId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`advertise\` ADD CONSTRAINT \`FK_7533d54ef11a0e751ea5b37d91b\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`award\` ADD CONSTRAINT \`FK_e429f39b970f0af2238dec28267\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`education\` ADD CONSTRAINT \`FK_f3f57b58b18078c6e4be04f613e\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_57509f1c18d287c0a1be4a29182\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`language\` ADD CONSTRAINT \`FK_cd270e0685c7ac344149ce0140f\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_c41a1d36702f2cd0403ce58d33a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job\` ADD CONSTRAINT \`FK_e66170573cabd565dab1132727d\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` ADD CONSTRAINT \`FK_b365907d182f331f5d3682968a0\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` ADD CONSTRAINT \`FK_1930768096ae42335d8125d80ec\` FOREIGN KEY (\`JobId\`) REFERENCES \`job\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD CONSTRAINT \`FK_aae20eafb2b4a5805bf4eb3d3d6\` FOREIGN KEY (\`workerId\`) REFERENCES \`worker\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`worker\` ADD CONSTRAINT \`FK_b4fc7927de11f45e2ecca71726b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp\` ADD CONSTRAINT \`FK_db724db1bc3d94ad5ba38518433\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kafeel\` ADD CONSTRAINT \`FK_eba20ef7c639f3d6ca7c2e450ce\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` ADD CONSTRAINT \`FK_551c7b45ce250ac2e47f96cef76\` FOREIGN KEY (\`chatsId\`) REFERENCES \`chats\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` ADD CONSTRAINT \`FK_4b9d9488cc949c7e00e2cb44ad7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` DROP FOREIGN KEY \`FK_4b9d9488cc949c7e00e2cb44ad7\``);
        await queryRunner.query(`ALTER TABLE \`chats_members_user\` DROP FOREIGN KEY \`FK_551c7b45ce250ac2e47f96cef76\``);
        await queryRunner.query(`ALTER TABLE \`kafeel\` DROP FOREIGN KEY \`FK_eba20ef7c639f3d6ca7c2e450ce\``);
        await queryRunner.query(`ALTER TABLE \`otp\` DROP FOREIGN KEY \`FK_db724db1bc3d94ad5ba38518433\``);
        await queryRunner.query(`ALTER TABLE \`worker\` DROP FOREIGN KEY \`FK_b4fc7927de11f45e2ecca71726b\``);
        await queryRunner.query(`ALTER TABLE \`skill\` DROP FOREIGN KEY \`FK_aae20eafb2b4a5805bf4eb3d3d6\``);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` DROP FOREIGN KEY \`FK_1930768096ae42335d8125d80ec\``);
        await queryRunner.query(`ALTER TABLE \`job_applicants\` DROP FOREIGN KEY \`FK_b365907d182f331f5d3682968a0\``);
        await queryRunner.query(`ALTER TABLE \`job\` DROP FOREIGN KEY \`FK_e66170573cabd565dab1132727d\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_c41a1d36702f2cd0403ce58d33a\``);
        await queryRunner.query(`ALTER TABLE \`language\` DROP FOREIGN KEY \`FK_cd270e0685c7ac344149ce0140f\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_57509f1c18d287c0a1be4a29182\``);
        await queryRunner.query(`ALTER TABLE \`education\` DROP FOREIGN KEY \`FK_f3f57b58b18078c6e4be04f613e\``);
        await queryRunner.query(`ALTER TABLE \`award\` DROP FOREIGN KEY \`FK_e429f39b970f0af2238dec28267\``);
        await queryRunner.query(`ALTER TABLE \`advertise\` DROP FOREIGN KEY \`FK_7533d54ef11a0e751ea5b37d91b\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_e07ec6a2e9267d02b004d0a9f23\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_2db9cf2b3ca111742793f6c37ce\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_36bc604c820bb9adc4c75cd4115\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP FOREIGN KEY \`FK_d25de32d1398e398a082f4f5d2a\``);
        await queryRunner.query(`DROP INDEX \`IDX_4b9d9488cc949c7e00e2cb44ad\` ON \`chats_members_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_551c7b45ce250ac2e47f96cef7\` ON \`chats_members_user\``);
        await queryRunner.query(`DROP TABLE \`chats_members_user\``);
        await queryRunner.query(`DROP TABLE \`kafeel\``);
        await queryRunner.query(`DROP TABLE \`otp\``);
        await queryRunner.query(`DROP TABLE \`worker\``);
        await queryRunner.query(`DROP TABLE \`skill\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa8996dccf9f610c3541a4119b\` ON \`job_applicants\``);
        await queryRunner.query(`DROP TABLE \`job_applicants\``);
        await queryRunner.query(`DROP TABLE \`job\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`language\``);
        await queryRunner.query(`DROP TABLE \`experience\``);
        await queryRunner.query(`DROP TABLE \`education\``);
        await queryRunner.query(`DROP TABLE \`award\``);
        await queryRunner.query(`DROP TABLE \`advertise\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2578043e491921209f5dadd08\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`chats\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP TABLE \`attachments\``);
    }

}
