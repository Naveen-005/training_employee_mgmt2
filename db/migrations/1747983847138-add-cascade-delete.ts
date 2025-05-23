import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeDelete1747983847138 implements MigrationInterface {
    name = 'AddCascadeDelete1747983847138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "address" SET "line2" = '123st', "house_no" = '123'`);
        await queryRunner.query(`UPDATE "employee" SET "date_of_joining" = '2021-01-01', "experience" = 1`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" SET NOT NULL `);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" SET NOT NULL `);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET NOT NULL `);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET NOT NULL `);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "house_no" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
