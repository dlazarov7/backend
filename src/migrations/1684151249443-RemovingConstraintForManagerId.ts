import { MigrationInterface, QueryRunner } from "typeorm"

export class RemovingConstraintForManagerId1684151249443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.employees ALTER COLUMN "manager_id" DROP NOT NULL;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.employees ALTER COLUMN "manager_id" SET NOT NULL;`)
    }

}
