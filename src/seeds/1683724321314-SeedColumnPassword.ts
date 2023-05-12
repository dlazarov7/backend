import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedColumnPassword1683724321314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE public.employees SET "password"="username"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE public.employees SET "password"=null`)
    }

}
