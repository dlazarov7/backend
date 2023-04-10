import { MigrationInterface, QueryRunner } from "typeorm"

export class Employees1681125723195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.employees
        (
            id integer NOT NULL DEFAULT nextval('employees_id_seq'::regclass),
            manager_id integer NOT NULL,
            team_id integer NOT NULL,
            first_name character varying COLLATE pg_catalog."default" NOT NULL,
            last_name character varying COLLATE pg_catalog."default" NOT NULL,
            username character varying COLLATE pg_catalog."default" NOT NULL,
            email character varying COLLATE pg_catalog."default" NOT NULL,
            "position" character varying COLLATE pg_catalog."default" NOT NULL,
            salary integer NOT NULL,
            "createdDate" timestamp without time zone NOT NULL DEFAULT now(),
            "endDate" timestamp without time zone,
            "teamId" integer,
            CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY (id),
            CONSTRAINT "UQ_31358a1a133482b25fe81b021eb" UNIQUE (username),
            CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE (email),
            CONSTRAINT "FK_66f8bf74042e2f42ded42fecf70" FOREIGN KEY ("teamId")
                REFERENCES public.teams (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        
        TABLESPACE pg_default;
        
        ALTER TABLE IF EXISTS public.employees
            OWNER to postgres;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employees",true)
    }

}
