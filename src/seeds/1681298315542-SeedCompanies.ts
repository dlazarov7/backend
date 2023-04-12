import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedCompanies1681298315542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.companies(id, name, country)
            VALUES (1, 'Entian', 'Bulgaria'),
             (2, 'Astea', 'Bulgaria'),
             (3, 'Uber', 'Bulgaria');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.companies WHERE id IN (1, 3)`)

    }

}
