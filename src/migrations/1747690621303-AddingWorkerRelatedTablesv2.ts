import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingWorkerRelatedTablesv21747690621303 implements MigrationInterface {
    name = 'AddingWorkerRelatedTablesv21747690621303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "award" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "awardLink" text NOT NULL, "describtion" text, "entity" text NOT NULL, "date" date, "workerId" uuid NOT NULL, CONSTRAINT "PK_e887e4e69663925ebb60d3a7775" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."education_degree_enum" AS ENUM('ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTORATE', 'DIPLOMA')`);
        await queryRunner.query(`CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" date NOT NULL, "degree" "public"."education_degree_enum" NOT NULL, "workerId" uuid NOT NULL, "describtion" text, "endDate" date, "uniOrSchool" text NOT NULL, "uniOrSchoolUrl" text, "country" text NOT NULL, "city" text, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experience" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" date NOT NULL, "workerId" uuid NOT NULL, "describtion" text, "endDate" date, "company" text NOT NULL, "companyUrl" text, "country" text NOT NULL, "city" text, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."language_lanuagelevel_enum" AS ENUM('BEGINNER', 'INTERMEDITE', 'NATIVE')`);
        await queryRunner.query(`CREATE TABLE "language" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" text NOT NULL, "lanuageLevel" "public"."language_lanuagelevel_enum" NOT NULL, "describtion" text, "workerId" uuid NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."skill_skilllevel_enum" AS ENUM('BEGINNER', 'INTERMEDITE', 'PROFISSIONAL')`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "skillLevel" "public"."skill_skilllevel_enum" NOT NULL, "describtion" text, "workerId" uuid NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" text, "lastName" text, "profilePhoto" text, "email" text NOT NULL, "password" text NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "phoneVerified" boolean NOT NULL DEFAULT false, "phoneNumber" text NOT NULL, "country" character varying, "birthDate" TIMESTAMP, "nationalId" character varying NOT NULL DEFAULT '30128489520460', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "worker" ("userId" uuid NOT NULL, "aboutMe" text, CONSTRAINT "PK_b4fc7927de11f45e2ecca71726b" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "award" ADD CONSTRAINT "FK_e429f39b970f0af2238dec28267" FOREIGN KEY ("workerId") REFERENCES "worker"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_f3f57b58b18078c6e4be04f613e" FOREIGN KEY ("workerId") REFERENCES "worker"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_57509f1c18d287c0a1be4a29182" FOREIGN KEY ("workerId") REFERENCES "worker"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_cd270e0685c7ac344149ce0140f" FOREIGN KEY ("workerId") REFERENCES "worker"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_aae20eafb2b4a5805bf4eb3d3d6" FOREIGN KEY ("workerId") REFERENCES "worker"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_b4fc7927de11f45e2ecca71726b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_b4fc7927de11f45e2ecca71726b"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_aae20eafb2b4a5805bf4eb3d3d6"`);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_cd270e0685c7ac344149ce0140f"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_57509f1c18d287c0a1be4a29182"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_f3f57b58b18078c6e4be04f613e"`);
        await queryRunner.query(`ALTER TABLE "award" DROP CONSTRAINT "FK_e429f39b970f0af2238dec28267"`);
        await queryRunner.query(`DROP TABLE "worker"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TYPE "public"."skill_skilllevel_enum"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TYPE "public"."language_lanuagelevel_enum"`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TYPE "public"."education_degree_enum"`);
        await queryRunner.query(`DROP TABLE "award"`);
    }

}
