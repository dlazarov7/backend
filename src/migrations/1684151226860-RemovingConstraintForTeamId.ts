import { MigrationInterface, QueryRunner } from "typeorm"

export class RemovingConstraintForTeamId1684151226860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.employees ALTER COLUMN "team_id" DROP NOT NULL;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.employees ALTER COLUMN "team_id" SET NOT NULL;`)
    }

}
