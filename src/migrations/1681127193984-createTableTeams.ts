import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Teams1681127193984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "teams",
                    columns: [
                        {
                            name: "id",
                            type: "string",
                            isGenerated: true,
                            generationStrategy: "increment",
                            isPrimary: true
                        },
                        {
                            name: "company_id",
                            type: "number",
                            foreignKeyConstraintName: "company_id_fk"

                        },
                        {
                            name: "name",
                            type: "string"
                        },
                        {
                            name: "department",
                            type: "string",
                        },
                        {
                            name: "description",
                            type: "string",
                            isNullable: true
                        }

                    ]
                })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("teams",true)
    }

}
