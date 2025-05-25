import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToEmployee1747887732044 implements MigrationInterface {
    name = 'AddPasswordToEmployee1747887732044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`update "employee" set "password" = 'password' where "password" is null`);
        await queryRunner.query(`ALTER TABLE "employee" alter column "password" set NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
