import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingRestOfTables1748010188782 implements MigrationInterface {
    name = 'AddingRestOfTables1748010188782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."advertise_preferredsponsortype_enum" AS ENUM('COMPANY', 'INDIVIDUAL', 'GOVERNMENT')`);
        await queryRunner.query(`CREATE TYPE "public"."advertise_worktype_enum" AS ENUM('FULL_TIME', 'PART_TIME', 'TEMPORARY', 'INTERNSHIP')`);
        await queryRunner.query(`CREATE TABLE "advertise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jobTitle" character varying(100) NOT NULL, "currentCity" character varying(50) NOT NULL, "preferredSponsorType" "public"."advertise_preferredsponsortype_enum" NOT NULL, "workType" "public"."advertise_worktype_enum" NOT NULL, "description" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "workerId" uuid NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_948362c417031b4fb02314da6c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."job_jobtype_enum" AS ENUM('FULL_TIME', 'PART_TIME', 'TEMPORARY', 'INTERNSHIP')`);
        await queryRunner.query(`CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "salary" numeric(10,2) NOT NULL, "location" character varying, "jobType" "public"."job_jobtype_enum" NOT NULL, "isRemote" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_applicants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workerId" uuid NOT NULL, "JobId" uuid NOT NULL, "CV" text NOT NULL, "describtion" text NOT NULL, "appliedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_aa8996dccf9f610c3541a4119b1" UNIQUE ("workerId", "JobId"), CONSTRAINT "PK_6ab3b674abead4b3f9295a610e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_usertype_enum" AS ENUM('WORKER', 'KAFEEL', 'COMPANY')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userType" "public"."user_usertype_enum" NOT NULL DEFAULT 'WORKER'`);
        await queryRunner.query(`ALTER TABLE "advertise" ADD CONSTRAINT "FK_7533d54ef11a0e751ea5b37d91b" FOREIGN KEY ("workerId") REFERENCES "worker"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_applicants" ADD CONSTRAINT "FK_b365907d182f331f5d3682968a0" FOREIGN KEY ("workerId") REFERENCES "worker"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_applicants" ADD CONSTRAINT "FK_1930768096ae42335d8125d80ec" FOREIGN KEY ("JobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_applicants" DROP CONSTRAINT "FK_1930768096ae42335d8125d80ec"`);
        await queryRunner.query(`ALTER TABLE "job_applicants" DROP CONSTRAINT "FK_b365907d182f331f5d3682968a0"`);
        await queryRunner.query(`ALTER TABLE "advertise" DROP CONSTRAINT "FK_7533d54ef11a0e751ea5b37d91b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userType"`);
        await queryRunner.query(`DROP TYPE "public"."user_usertype_enum"`);
        await queryRunner.query(`DROP TABLE "job_applicants"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TYPE "public"."job_jobtype_enum"`);
        await queryRunner.query(`DROP TABLE "advertise"`);
        await queryRunner.query(`DROP TYPE "public"."advertise_worktype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."advertise_preferredsponsortype_enum"`);
    }

}
