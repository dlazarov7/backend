import { Column, MigrationInterface, QueryRunner } from "typeorm"
import { Employee } from "../models/Employee"

export class AddPasswordColumnToEmployeeTable1683721917909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD COLUMN "password" VARCHAR(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);

    }

}
