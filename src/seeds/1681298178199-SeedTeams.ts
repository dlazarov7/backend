import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedTeams1681298178199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.teams(
            id, company_id, name, department, description)
            VALUES (1, 1, 'UNSS', 'schetovodstvo', 'opravqne na dokumentacii'),
            (2, 2, 'FMI', 'dev', 'pishem mnogo kod'),
            (3, 3, 'NBU', 'QA', 'ne sme bezgreshni no sme istinski')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.teams WHERE id IN (1, 3)`)
    }
    

}
