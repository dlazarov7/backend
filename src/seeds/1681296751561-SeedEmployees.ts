import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedEmployees1681296751561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.employees(
            id, manager_id, team_id, first_name, last_name, username, email, "position", salary, "startDate", "endDate")
            VALUES (1, 1, 1, 'Dimitar', 'Lazarov', 'lazarovd', 'lazarovd@abv.bg', 'manager', '2200', '2012-02-12', null),
            (2, 2, 2, 'Aleksander', 'Farkov', 'farkova', 'farkova@abv.bg', 'manager', '2200', '2021-05-06', null),
            (3, 3, 3, 'Danislav', 'Ivanov', 'ivanovd', 'ivanovd@abv.bg', 'manager', '2200', '2020-12-09', null),
            (4, 1, 1, 'Ivan', 'Lipev', 'lipevi', 'lipevi@abv.bg', 'HR', '2000', '2022-09-12', null),
            (5, 1, 1, 'kiril', 'Dambov', 'dambovk', 'dambovk@abv.bg', 'schetovoditel', '2160', '2012-07-12', null),
            (6, 2, 2, 'Ilian', 'Apostolov', 'apostolova', 'apostolova@abv.bg', 'dev', '2250', '2012-03-04', null),
            (7, 2, 2, 'Iveta', 'Razsolkova', 'razsolkovai', 'razsolkovai@abv.bg', 'dev', '2180', '2012-02-02', null),
            (8, 3, 3, 'Monika', 'Yordanova', 'yordanovam', 'yordanovam@abv.bg', 'QA', '2100', '2012-12-08', null),
            (9, 3, 3, 'Diana', 'Karabasheva', 'karabashevad', 'karabashevad@abv.bg', 'QA', '2220', '2012-04-18', null)`);
            
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.employees WHERE id IN (1, 9)`)

    }

}
